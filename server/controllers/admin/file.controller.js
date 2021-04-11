const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const MyUtil = require('../../common/myutil');
class AdminFileController {
  upload(req, res, next) {
    const files = req.files || {};
    if(_.isEmpty(files)) {
      res.json(MyUtil.wrapperResponse('文件为空'));
    }
    let file = req.files.file;
    const md5Val = file.md5;
    // eslint-disable-next-line no-undef
    const dirPath = path.join(__dirname, '../../../static/upload', md5Val.slice(0,2), md5Val.slice(-2));
    const filePath = `${dirPath}/${md5Val}${path.extname(file.name)}`;
    let result= MyUtil.mkdir(dirPath);
    if(result.status !== 0) {
      res.json(MyUtil.wrapperResponse('文件存储失败'));
    }
    fs.writeFileSync(filePath, file.data);
    res.json(MyUtil.wrapperResponse('', {}));
    next();
  }
}


module.exports =new AdminFileController();
