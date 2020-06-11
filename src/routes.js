const express = require('express');
const PointsController = require('./controllers/PointsController');
const ItemsController = require('./controllers/ItemsControllers');
const multer = require('multer');
const multerConfig = require('./config/multer');
const {celebrate, Joi} = require('celebrate');

const routes = express.Router();

const upload = multer(multerConfig);

routes.get('/collect_items', new ItemsController().index);

// upload.array('image')para enviar varios arquivos

routes.get('/collect_points/:id', new PointsController().show);
routes.get('/collect_points', new PointsController().index);

const validationRoute = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        telephone: Joi.string().required(),
        'zip_code': Joi.string().required(),
        UF: Joi.string().required().max(2),
        city: Joi.string().required(),
        addressNumber: Joi.string().required(),
        street: Joi.string().required(),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        cellphone: Joi.string().required(),
        neighborhood: Joi.string().required(),
        items: Joi.string().required(),
    })
},
    {
        abortEarly: false
    }
);

routes.post(
    '/collect_points', 
    upload.single('image'), 
    validationRoute,
    new PointsController().create
);

module.exports = routes;