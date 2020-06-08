const express = require('express');
const PointsController = require('./controllers/PointsController');
const ItemsController = require('./controllers/ItemsControllers');

const routes = express.Router();

routes.get('/collect_items', new ItemsController().index);

routes.post('/collect_points', new PointsController().create);
routes.get('/collect_points/:id', new PointsController().show);
routes.get('/collect_points', new PointsController().index);

module.exports = routes;