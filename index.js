#!/usr/bin/env node

const program = require('commander');
const NetPingInput = require('./inputs/netping').NetPing;
const StdoutOutput = require('./outputs/stdout').Stdout;
const defaultOptions = {
  interval : 3000,
}

program
  .version('0.1.0')
  .description("node-sys is an agent for collecting, processing, aggregating, and writing metrics in nodejs")
  .option('-c, --config <config.yaml>', 'Config file of node-sys','node-sys.yaml')
  .option('-d, --display', 'Display default configuration')

program.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ custom-help --help');
  console.log('  $ custom-help -h');
});

const pingOptions = {
  target : 'www.google.f'
}
const stdout = new StdoutOutput();
const pingin = new NetPingInput(pingOptions,[stdout]);

(async () => {
  let response = await pingin.start();
})();

program.parse(process.argv);
