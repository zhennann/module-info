const fs = require('fs');
const path = require('path');
const mparse = require('egg-born-mparse').default;

module.exports = {
  lookupPackage(dir) {
    let _dir = dir;
    // eslint-disable-next-line
    while (true) {
      const file = path.join(_dir, 'package.json');
      if (file === '/package.json') return null;
      if (fs.existsSync(file)) return file;
      _dir = path.join(_dir, '../');
    }
  },
  parseInfoFromPackage(dir) {
    const file = this.lookupPackage(dir);
    if (!file) return null;
    const pkg = require(file);
    return mparse.parseInfo(mparse.parseName(pkg.name));
  },
};
