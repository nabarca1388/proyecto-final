//maneja los endpoint de products

const express = require('express');
const productos = require('../productos');


const router_products = express.Router();

const product = new productos('productos.json');
 

router_products.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.json(product.getProductById(id));
})


router_products.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit);

    res.json(product.getProducts(limit))
})


router_products.post('/products', (req, res) => {
    const productoNuevo = req.body;
    
    product.addProduct(productoNuevo)
    res.status(200).send({ estado: 'ok', mensaje: 'producto ingresado'});
});


router_products.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoNuevo = req.body;

    product.updateProduct(productoNuevo, id);
    res.status(200).send({ estado: 'ok', mensaje: 'producto modificado'});
})


router_products.delete('/products/:id', (req, res) => {
    let id = parseInt(req.params.id);
    res.json(product.deleteProduct(id));
    res.status(200).send({ estado: 'ok', mensaje: 'producto eliminado'});
})



module.exports = router_products;



