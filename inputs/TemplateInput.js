const NsInput = require("../libs/input");

class TemplateInput extends NsOutput {
  constructor() {
    super();
  }

  init() {
    // initialisation of input whan start is called
    console.log("init");
  }

  close() {
    // initialisation of input whan stop is called
    console.log("init");
  }

  /**
   *
   *
   * @param {Out Properties} out
   * @memberof StdOutput
   */
  exec() {
    // Add your code for input to output, must be a propertie object
    let out = { example : 'myExample'}
    // Call success() if success or failed() if failed
    let success = true
    if(success) this.success();
    else this.failed();
    return out;
  }

}

module.exports = TemplateInput;
