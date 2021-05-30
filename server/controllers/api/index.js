const express = require('express');
const Router = express.Router;

const carouselController = require('./carousels.controller');
const brandController = require('./productBrands.controller');
const productController = require('./products.controller');

var router = Router();


router.get('/products', productController.index);
router.get('/products/:id', productController.show);
router.get('/brands', brandController.index);
router.get('/carousels', carouselController.index);

module.exports = router;

