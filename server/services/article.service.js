const models = require('../models');
const CRUDService = require('./crud.service');

class ArticleService extends CRUDService {
  getModel() {
    return models.articleModel;
  }
}

module.exports = new ArticleService();


