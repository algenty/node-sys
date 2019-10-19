const NsOutput = require('./output');
class Stdout extends NsOutput{
  constructor() {
  }

  success(out) {
    super.success(out);
    console.log(JSON.stringify(output));
  }

  failed(output) {
    super.failed(output);
    console.log(JSON.stringify(output));
  }
}

module.exports = { Stdout };
