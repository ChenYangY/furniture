const child_process = require('child_process');
const  _  = require('lodash');
const nodeXlsx = require('node-xlsx').default;
class MyUtil {
  static mkdir(dirPath) {
    return child_process.spawnSync('mkdir', ['-p', dirPath]);
  }

  static wrapperResponse(err, data) {
    if(err) {
      return  {
        code: -1,
        msg: err.toString(),
      };
    }
    return {
      msg:'ok',
      code: 0,
      data: data
    };
  }
  static mapRecord(mapObject, rows) {
    let keys = Object.keys(mapObject);
    let info = {};
    _.each(keys, (key) => {
      info[key] = rows[mapObject[key]][1] || '';
    });
    return info;
  }
  static getRecordInfoFromXlsx(file, mapObject) {
    let sheets = nodeXlsx.parse(file.data);
    let info = MyUtil.mapRecord(mapObject, sheets[0].data);
    return info;
  }
}

module.exports = MyUtil;
