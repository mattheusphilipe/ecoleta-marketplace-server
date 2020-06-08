const knex = require('../database/connection');

class ItemsController {

    async index(request, response) {
        const whichPort = process.env.PORT || 3232;
        try {
  
            const items = await knex('collected_items').select('*');
            const serializedItems = items.map(({title, image, id}) => 
                ({id, title, image_url: `${process.env.APP_URL}:${whichPort}/uploads/${image}`}));
        
            response.json(serializedItems);

        } catch (err) {
            return response.json({failure: true, reason: err});
        }

    }
}

module.exports = ItemsController;
