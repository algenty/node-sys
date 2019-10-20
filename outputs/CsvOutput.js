const NsOutput = require("../libs/output");

class StdOutput extends NsOutput {
  constructor(stdOutOpions) {
    super(stdOutOpions);
    this.stdOutOpions = stdOutOpions;
    this.initTitle = false;
    this.title = "";
  }

  init() {
    this.getOptions().file = "./csvOutput.csv";
    this.getOptions().separator = ";";
  }

  exec(out) {
    if(out == null || out == undefined ) {
      this.failed("Out is null");
      return;
    }
    if (!this.initTitle) {
      this.initTitle = true;
      this.write(this.getHead(out));
    }
    let csvLine = this.jsonToCsv(out);
    this.write(csvLine);
    this.success();
  }

  jsonToCsv(json) {
    let line = "";
    for (let key of Object.keys(json)) {
      if (line.length > 0) line = `${line}${this.getOptions().separator}${json[key]}`;
      else line = `${json[key]}`;
    }
    return line;
  }

  write(line) {
    console.log(line);
  }

  getHead(out) {
    let title = "";
    for (let key of Object.keys(out)) {
      if (title.length > 0) title = `${title}${this.getOptions().separator}${key}`;
      else title = `${key}`;
    }
    return title;
  }
}

module.exports = StdOutput;
