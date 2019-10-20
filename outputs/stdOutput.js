const NsOutput = require('../libs/output');


class StdOutput extends NsOutput{
  constructor(stdOutOpions){
    super(stdOutOpions);
  }

  open() {
    console.log("Init of StdOutput ");
  }

  exec(out) {
    console.log(JSON.stringify(out));
    this.success();
  }

  close() {
    console.log("Close of StdOutput");
  }

}

module.exports = StdOutput;
