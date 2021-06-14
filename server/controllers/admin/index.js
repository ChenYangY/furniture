const express = require('express');
const Router = express.Router;

var router = Router();

const productController = require('./products.controller');
const productBrandController = require('./proudctBrands.controller');
const carouselsController = require('./carousels.controller');
const fileController = require('./file.controller');
const auth = require('../../middleware/auth');

// router.use(auth);
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
    controllerInst.update(req, res);
  });
  router.delete(`/${urlPath}/:id`, function(req, res) {
    controllerInst.delete(req, res);
  });
}
// Add product routes
router.post('/products/batch-import', function(req, res) {
  productController.batchImport(req, res);
});
addResourceRoute('products', router, productController);



// Add product-brand routes
addResourceRoute('product-brands', router, productBrandController);

// Add product-brand routes
addResourceRoute('carousels', router, carouselsController);

router.post('/upload', function(req, res, next) {
  fileController.upload(req, res, next);
});





module.exports = router;
