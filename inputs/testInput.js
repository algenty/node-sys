const NsInput = require('../libs/input');
const os = require('os'); 

class TestInput extends NsInput {
  constructor(options,outputs) {
    super(options,outputs);
  }

  open() {
    console.log("open of TestInput");
    return this;
  }

  close() {
    console.log("Close of TestInput");
    return this;
  }

  exec() {
    let max = 100
    let result = {
      timespamp : Date.now(),
      host : os.hostname(),
      value1 : Math.floor(Math.random() * Math.floor(max)),
      value2 : Math.floor(Math.random() * Math.floor(max)),
    }
    this.success();
    return result;
  }
}

module.exports = TestInput;