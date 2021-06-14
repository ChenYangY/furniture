
const models = require('../models');
const CRUDService = require('./crud.service');
const decompress = require('decompress');
const path = require('path');
const _ = require('lodash');
const MyUtil = require('../common/myutil');
const fs = require('fs');
const FileService = require('../services/file.service');
const BrandService = require('../services/productBrand.service');
const brandService = new BrandService();

class ProudctService extends CRUDService {
  getModel() {
    return models.proudctModel;
  }
  analyseFiles(files) {
    files.sort((a,b) => {
      return a.path.localeCompare(b.path);
    });
    let records = [];
    let record = {images: []};
    let cur = '';
    let mapObject = {
      brand: 0,
      name: 1,
      material: 2,
      dimensions: 3,
      weight: 4,
      tag_1: 5,
      tag_2: 6
    };
    files.forEach((file) => {
      let extname = path.extname(file.path);
      let dirname = path.dirname(file.path);
      if(cur && dirname !== cur && Object.keys(record).length > 1) {
        records.push(record);
        record = {images: []};
      }
      cur = dirname;
      if(extname === '.xlsx') {
        let info = MyUtil.getRecordInfoFromXlsx(file, mapObject);
        Object.assign(record, info);
      }
      else if(/^\.[jpeg|jpg|png]/.test(extname)) {
        record.images.push(file);
      }
    });
    return records;
  }

  async storageBatchImportRecord(records) {
    let inserts = [];
    let fields = ['name', 'material', 'dimensions', 'weight'];
    for(let record of records) {
      let doc = {images: [], tags: []};
      let brands = await brandService.findByName(record.brand);
      if(brands <= 0) {
        let brandDoc = await brandService.updateOne({
          name: record.brand,
        }, {name: record.brand}, {upsert: true});
        doc.brand = brandDoc._id;
      }
      else {
        doc.brand = brands[0]._id;
      }
      let partDoc = _.pick(record, fields);
      Object.assign(doc, partDoc);
      _.each(record.images, (image) => {
        let path = FileService.storageFile(image, '../../static/upload');
        doc.images.push(path);
      });
      if(record.tag_1) {
        doc.tags.push(record.tag_1);
      }
      if(record.tag_2) {
        doc.tags.push(record.tag_2);
      }
      let insertDoc = {
        updateOne: {
          filter: {name: doc.name},
          update: doc,
          upsert: true,
        },
      };
      inserts.push(insertDoc);
    }
    await this.getModel().bulkWrite(inserts);
  }

  async batchImport(data) {
    let files = [];
    const timestamp = Date.now();
    const targetPath = path.resolve(`../../temp/${timestamp}`);
    try {
      files = await decompress(data, targetPath, {
        filter: (file) => {
          let filename = path.basename(file.path);
          return !/__.*/.test(file.path) && file.type === 'file' && !/^\..*/.test(filename);
        },
        map: (file) => {
          let name = path.basename(file.path);
          file.name = name;
          return file;
        }
      });
    } catch (e) {
      throw new Error('文件解析失败');
    }
    fs.rmdirSync(targetPath, {recursive: true});
    let records = await this.analyseFiles(files);
    let inserts = await this.storageBatchImportRecord(records);
    return inserts;
  }


}

module.exports = ProudctService;

