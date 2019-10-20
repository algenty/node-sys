const NsOutput = require("../libs/output");

class TemplateOutput extends NsOutput {
  constructor() {
    super();
  }

  init() {
    // initialisation of output whan start is called
    console.log("init");
  }

  close() {
    // initialisation of output whan stop is called
    console.log("init");
  }

  /**
   *
   *
   * @param {Out Properties} out
   * @memberof StdOutput
   */
  exec(out) {
    // Add your code for output here
    console.log(out)
    // Call success() if success or failed() if failed
    let success = true
    if(success) this.success();
    else this.failed();
  }
}

module.exports = TemplateOutput;
