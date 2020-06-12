
const knex = require('../database/connection');

class PointerController {

    async index(request, response) {
        const {city, UF, items} = request.query;

        if (!Object.keys(request.query).length) {
            return response.json({failure: true, reason: 'empty body data'});
        }

        try {
          
            const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

            const pointsFilteredByCollectedItemId = await 
             knex('collect_points')
            .join('point_collected_items',
             'collect_points.id', 
             '=',
              'point_collected_items.collect_point_id')
            .whereIn('point_collected_items.collected_item_id', parsedItems)
            .where('city', String(city))
            .where('UF', String(UF))
            .distinct()
            .select('collect_points.*'); // collect_points.* pegar os atri
            
            const serializedPoints = pointsFilteredByCollectedItemId.map((point) => 
                
                 ({
                   ...point,
                    image_url: `${process.env.APP_URL}userUploads/${point.image}`
                    // image_url: `http://localhost:3232/userUploads/${point.image}`
                })
                
            );
        
            return response.json(serializedPoints);

        } catch (err) {
            console.error({...err})
            return response.status(400).json({message: 'Error to execute queryBuilder', error: {...err}});
        }
        
    }

    async show(request, response) {
        const {id} = request.params;
        if (!Object.keys(request.params).length) {
            return response.json({failure: true, reason: 'empty body data'});
        }
        try {
            const point = await knex('collect_points').where('id', id).first(); // retorna somente um regtistro

            if (!point) {
                return response.status(400).json({message: 'Collect point not found.'});
            }

                        
            const serializedPoints =
            {
                ...point,
                image_url: `${process.env.APP_URL}userUploads/${point.image}`
                // image_url: `http://localhost:3232/userUploads/${point.image}`
            };

            // SELECT * FROM collected_items 
            //JOIN point_collected_items on collected_items.id = point_collected_items.collected_item_id
            // WHERE point_collected_items.collect_point_id = id

            const itemsCollectedByThisPoint = await 
            knex('collected_items')
            .join('point_collected_items', 
            'collected_items.id', 
            '=', 
            'point_collected_items.collected_item_id'
            )
            .where('point_collected_items.collect_point_id', id)
            .select('collected_items.title') //caso eu queira so o titlo dos items coletados

            // sem a clausula select ele projeta tudo

            return response.json({serializedPoints, itemsCollectedByThisPoint});

        } catch (err) {
            return response.status(400).json({message: 'Error to execute queryBuilder', error: err});
        }
        
    }

    async create(request, response) {

        if (!Object.keys(request.body).length) {
            return response.json({failure: true, reason: 'empty body data'});
        }


        const {
            name,
            email,
            UF,
            city,
            street,
            zip_code,
            neighborhood,
            addressNumber,
            latitude,
            longitude,
            telephone,
            cellphone,
            items,
        } = request.body;

        try {

            const trx = await knex.transaction();

            const image = request.file.filename || 'https://images.unsplash.com/photo-1506484381205-f7945653044d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'

            const pointsItems = {
                     image: String(image),
                     name: String(name),
                     email: String(email),
                     UF: String(UF),
                     city: String(city),
                     street: String(street) || '',
                     zip_code: String(zip_code),
                     addressNumber: parseInt(addressNumber) || 0,
                     neighborhood: String(neighborhood) || '',
                     telephone: String(telephone) ,
                     cellphone: String(cellphone) || '',
                     latitude: Number(latitude),
                     longitude: Number(longitude)
                 };


            const collect_point_id =  await trx('collect_points').returning('id').insert(pointsItems);
            // sqlite dont needs returning id but pg needs const 
            //collect_point_id =  await trx('collect_points').insert(pointsItems);
    
                const pointItems = items
                .split(',')
                .map(item => +item.trim()) // + hackconverter também apra numero
                .map((collected_item_id) => 
                    ({
                            collected_item_id, 
                            collect_point_id: collect_point_id[0]
                    })
                );
    
                const t = await trx('point_collected_items').insert(pointItems);
                await trx.commit();
    
    
                return response.json({success: true, id: collect_point_id[0],...pointsItems, items});

        } catch (err) {
            return response.json({failure: true, reason: err});
        }

    }
}

module.exports = PointerController;