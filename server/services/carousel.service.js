const models = require('../models');
const CRUDService = require('./crud.service');

class CarouselService extends CRUDService {
  getModel() {
    return models.carouselModel;
  }
}

module.exports = CarouselService;


