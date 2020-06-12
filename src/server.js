const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const {errors} = require('celebrate');

const httpServer = express(); // extrair o servidor http de dentro do express e unir com wsocket
// meoria do node mudar para o mongo
// preciso saber o id do usuario do mongo db e a relação com o id de socket
// para saber qual usuario está em qual socket
// melhor usando banco chave valor como o mongo

 // middleware é um interceptador, como uam rota dentro da aplicação

 httpServer.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
 httpServer.use('/userUploads', express.static(path.resolve(__dirname, '..', 'userUploads')));

 httpServer.use(cors());
 httpServer.use(express.json());
 httpServer.use(errors())
 httpServer.use(express.urlencoded({extended: true}));
 httpServer.use(routes);

 
//  httpServer.listen(3232);
 httpServer.listen(process.env.PORT || 3232)