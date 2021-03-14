class CRUDController {
  constructor() {
    this.service = {};
  }
  format() { return {}; }
  getPagination(req) {
    const page = parseInt(req.query.page, 10) || 1;
    const size = parseInt(req.query.size, 10) || 10;
    return {skip: (page - 1)*10, limit: size};
  }

  // this method need to overwrite
  getFilter() { return {}; }

  index(req, res) {
    let filters = this.getFilter();
    let pagination = this.getPagination(req);
    let records;
    this.service.findAll(filters, {}, {
      sort: req.query.sort,
      limit: pagination.limit,
      skip: pagination.skip,
    }).then((docs) => {
      records = docs;
      return this.service.count(filters);
    }).then((total) => {
      this.responseController('', res, {
        docs: records.map((item) => {
          return this.format(item);
        }),
        count: total,
      });
    }).catch((err) => {
      console.log(err);
      this.responseController(err, res);
    });
  }

  show(req, res) {
    this.service.findById(req.params.id)
      .then((doc) => {
        if(!doc) throw new Error('数据不存在');
        this.responseController('', res, this.format(doc));
      })
      .catch((err) => {
        this.responseController(err, res);
      });
  }
  // need to overwrite
  getCreateData(req) {
    const body = req.body || {};
    return body;
  }

  getUpdateData(req) {
    const body = req.body || {};
    return body;
  }

  update(req, res) {
    const data = this.getUpdateData(req);
    this.service
      .updateById(req.params.id, data)
      .then(doc => {
        this.responseController('', res, this.format(doc));
      })
      .catch(err => {
        this.responseController(err, res);
      });
  }

  create(req, res) {
    const data = this.getCreateData(req);
    this.service
      .create(data)
      .then(doc => {
        this.responseController('', res, this.format(doc));
      })
      .catch(err => {
        this.responseController(err, res);
      });
  }

  delete(req, res) {
    this.service.deleteById(req.params.id)
      .then(() => {
        this.responseController('', res, {});
      })
      .catch((err) => {
        this.responseController(err,res);
      });
  }

  responseController(err, res, data) {
    let pack;
    if (err) {
      pack = {
        code: -1,
        msg: err.toString(),
      };
    }
    else {
      pack = {
        code: 0,
        msg: 'ok',
        data: data
      };
    }
    res.json(pack);
  }

}

module.exports = CRUDController;
