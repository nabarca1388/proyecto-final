//maneja los endpoint de usuarios

const express = require('express');
const productos = require('../productos');
const carts = require('../carts');


const router_carts = express.Router();

const cart = new carts('carts.json');
const products = new productos('productos.json');



 
router_carts.get('/carts/:cid', (req, res) => {
    const cid = parseInt(req.params.cid);
    res.json(cart.getCart(cid));
})


router_carts.post('/carts', (req, res) => {
    const cart1 = req.body;

    cart.addCart(cart1);
    res.status(202).send({estado: 'ok'});
})


router_carts.post('/carts/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const product = products.getProductById(pid);

    cart.addProductInCart(cid, product);
    res.status(202).send({estado: 'ok'});
})



module.exports = router_carts;
