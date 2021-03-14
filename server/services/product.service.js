
const models = require('../models');
const CRUDService = require('./crud.service');

class ProudctService extends CRUDService {
  getModel() {
    return models.proudctModel;
  }
}

module.exports = ProudctService;

