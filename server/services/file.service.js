const MyUtil = require('../common/myutil');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
class FileService {
  /**
   * @param {Object} fileInfo  {name:String, data: Buffer}
   * @param {String} targetDir
   * @param {Object} options {md5Val: String}
   * @return {String} Web Visit Path
  */
  static storageFile(fileInfo, targetDir, options = {}) {
    let filename = fileInfo.name;
    let data = fileInfo.data;
    let md5Val = options.md5Val;
    if(!options.md5Val) {
      const hash = crypto.createHash('md5');
      md5Val = hash.update(data).digest('hex');
    }

    const basePath = targetDir;
    const dirPath = path.join(basePath, md5Val.slice(0,2), md5Val.slice(-2));
    const filePath = `${dirPath}/${md5Val}${path.extname(filename)}`;
    // eslint-disable-next-line no-undef
    const absoluteDirPath = path.join(__dirname, dirPath);
    let result= MyUtil.mkdir(absoluteDirPath);
    if(result.status !== 0) {
      throw new Error('文件存储失败');
    }
    // eslint-disable-next-line no-undef
    fs.writeFileSync(path.join(__dirname, filePath), fileInfo.data);
    return `/upload${filePath.replace(basePath, '')}`;
  }
}

module.exports = FileService;
