class CRUDService {
  getModel() {}

  findAll (condition, projection = {}, options) {
    return this.getModel().find(condition, projection, options);
  }

  findById (id) {
    return this.getModel().findOne({_id: id});
  }

  deleteById(id) {
    return this.getModel().deleteOne(id);
  }

  updateById(id, data) {
    return this.getModel().updateOne({_id: id}, {$set: data});
  }

  count(condition) {
    return this.getModel().countDocuments(condition);
  }

  create(data) {
    return this.getModel().create(data);
  }
}

module.exports = CRUDService;
