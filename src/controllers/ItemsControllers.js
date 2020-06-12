const knex = require('../database/connection');

class ItemsController {

    async index(request, response) {
        try {
  
            const items = await knex('collected_items').select('*');
            const serializedItems = items.map(({title, image, id}) => 
                 ({id, title, image_url: `${process.env.APP_URL}uploads/${image}`}));
                 // ({id, title, image_url: `http://localhost:3232/uploads/${image}`}));
            response.json(serializedItems);

        } catch (err) {
            return response.json({failure: true, reason: err});
        }

    }
}

module.exports = ItemsController;
