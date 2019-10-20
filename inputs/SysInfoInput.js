const NsInput = require('../libs/input');
const os = require('os'); 

class SysInfoInput extends NsInput {
  constructor(options,outputs) {
    super(options,outputs);
    this.options = options;
  }

  // init() {
  //   console.log(`Init of + ${this.getOptions().type}`);
  //   return this;
  // }

  // close() {
  //   console.log(`Close of + ${this.getOptions().type}`);
  //   return this;
  // }

  exec() {
    let max = 100
    let result = {
      timespamp : Date.now(),
      host : os.hostname(),
      type : os.type(),
      uptime : os.uptime(),
      totalMemory : os.totalmem(),
      freeMemory : os.freemem(),

    }
    this.success();
    return result;
  }
}

module.exports = SysInfoInput;