const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const MyUtil = require('../../common/myutil');
const FileService = require('../../services/file.service');
class AdminFileController {
  upload(req, res) {
    const files = req.files || {};
    if(_.isEmpty(files)) {
      res.json(MyUtil.wrapperResponse('文件为空'));
      return;
    }
    let keys = Object.keys(req.files);
    let paths = [];
    let errorFiles = [];
    _.each(keys, (key) => {
      let file = req.files[key];
      const basePath = '../../static/upload';
      try {
        let visitPath = FileService.storageFile({data:file.data, name: file.name}, basePath, {md5Val: file.md5});
        paths.push(visitPath);
      } catch (e) {
        // TODO: maybe need to rollback
        console.log(e.stack);
        errorFiles.push(file);
      }
    });
    if(errorFiles.length > 0) {
      res.json(MyUtil.wrapperResponse('文件存储失败'));
      return;
    }
    res.json(MyUtil.wrapperResponse('', {paths: paths}));
  }
}


module.exports =new AdminFileController();
