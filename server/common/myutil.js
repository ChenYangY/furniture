const child_process = require('child_process');
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
}

module.exports = MyUtil;
