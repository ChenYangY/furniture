const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const MyUtil = require('../../common/myutil');
class AdminFileController {
  upload(req, res) {
    const files = req.files || {};
    if(_.isEmpty(files)) {
      res.json(MyUtil.wrapperResponse('文件为空'));
      return;
    }
    let keys = Object.keys(req.files);
    let paths = [];
    _.each(keys, (key) => {
      let file = req.files[key];
      const md5Val = file.md5;
      const basePath = '../../../static/upload';
      const dirPath = path.join(basePath, md5Val.slice(0,2), md5Val.slice(-2));
      const filePath = `${dirPath}/${md5Val}${path.extname(file.name)}`;
      // eslint-disable-next-line no-undef
      const absoluteDirPath = path.join(__dirname, dirPath);
      let result= MyUtil.mkdir(absoluteDirPath);
      if(result.status !== 0) {
        res.json(MyUtil.wrapperResponse('文件存储失败'));
        return;
      }
      // eslint-disable-next-line no-undef
      fs.writeFileSync(path.join(__dirname, filePath), file.data);
      paths.push(`/upload${filePath.replace(basePath, '')}`);
    });
    res.json(MyUtil.wrapperResponse('', {paths: paths}));
  }
}


module.exports =new AdminFileController();
