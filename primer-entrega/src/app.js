// npm init -y
// npm install express
// npm install multer, middleware de terceros
// node + nombre archivo



const express = require('express');
const router_products = require('./routes/products_route');
const router_carts = require('./routes/carts_route');


const PUERTO = 8080;
//inicializo servidor
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true}));


//parte dinamica
server.use('/api', router_products);
server.use('/api', router_carts);
//parte estatica
server.use('/public', express.static(`${__dirname}/public`));



server.listen(PUERTO, () => {
    console.log(`Servidor iniciado en puerto ${PUERTO}`);
})

