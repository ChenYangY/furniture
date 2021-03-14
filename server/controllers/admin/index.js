const express = require('express');
const Router = express.Router;

var router = Router();

const productController = require('./products.controller');
const productBrandController = require('./proudctBrands.controller');
const carouselsController = require('./carousels.controller');
const proudctBrandsController = require('./proudctBrands.controller');


function addResourceRoute(urlPath, router, controllerInst) {
  router.get(`/${urlPath}`, function(req, res) {
    controllerInst.index(req, res);
  });
  router.post(`/${urlPath}`, function(req, res) {
    controllerInst.create(req, res);
  });
  router.get(`/${urlPath}/:id`, function(req, res) {
    controllerInst.show(req, res);
  });
  router.put(`/${urlPath}/:id`, function(req, res) {
    controllerInst.put(req, res);
  });
  router.delete(`/${urlPath}/:id`, function(req, res) {
    controllerInst.delete(req, res);
  });
}
// Add product routes
addResourceRoute('products', router, productController);

// Add product-brand routes
addResourceRoute('product-brands', router, productBrandController);


// router.get('/proudct-brands', function(req, res) {
//   prouductBrandController.index(req, res);
// });
// router.post('/proudct-brands', productController.create);
// router.put('/proudct-brands/:id', productController.update);
// router.delete('/proudct-brands/:id', productController.delete);
// router.get('/proudct-brands/:id', productController.show);

// Add product-brand routes
addResourceRoute('carousels', router, carouselsController);
// router.get('/carousels', function(req, res) {
//   carouselsController.index(req, res);
// });
// router.post('/carousels', carouselsController.create);
// router.put('/carousels/:id', carouselsController.update);
// router.delete('/carousels/:id', carouselsController.delete);
// router.get('/carousels/:id', carouselsController.show);




module.exports = router;
