'use strict';

class Nodesys {
  constructor(args) {
    this.args = args;
    this.version = '0.0.1';
    this.program = require('commander');
    this.program.version(this.version)
      .description('Metrics exporters')
      .option('-h, --help','Command line options')
      .parse(args);
    this.exec();
  }

  help() {
    console.log(this.program.opts());
    process.exit(0);
  }

  exec() {
    // console.log(this.program.help);
    // if(this.program.help()) this.help();
    const system = require('./inputs/system');
    system.output();
  }

}

function main() {
  let args = 'empty';
  let nodesys = new Nodesys(process.argv);
  nodesys.exec()
}

main();