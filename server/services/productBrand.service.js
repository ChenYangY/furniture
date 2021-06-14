const models = require('../models');
const CRUDService = require('./crud.service');


class ProductBrandService extends CRUDService {
  getModel() {
    return models.productBrandModel;
  }

  findByName(name) {
    return this.getModel().find({name});
  }
}

module.exports = ProductBrandService;


