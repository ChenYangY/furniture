const CRUDController = require('./crud.controller');
const CarouselService = require('../../services/carousel.service');
const _ = require('lodash');

class CarouselController extends CRUDController {
  constructor() {
    super();
    this.service = new CarouselService();
  }

  format(doc) {
    const fields = [
      '_id', 'name', 'create_at', 'update_at', 'images', 'status',
    ];
    return _.pick(doc, fields);
  }
}

module.exports = new CarouselController();
