const NsOutput = require("../libs/output");

class StdOutput extends NsOutput {
  constructor(stdOutOpions) {
    super(stdOutOpions);
  }

  // init() {
  //   console.log("INIT");
  // }

  // close() {
  //   console.log("CLOSE");
  // }

  exec(out) {
    console.log(JSON.stringify(out));
    this.success();
  }
}

module.exports = StdOutput;
