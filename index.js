#!/usr/bin/env node

const program = require("commander");
const server = require('./libs/server');
const TestInput = require("./inputs/TestInput");
const NsInput = require("./libs/input");
const NsOutput = require("./libs/output");

program
  .version("0.1.0")
  .description(
    "node-sys is an agent for collecting, processing, aggregating, and writing metrics in nodejs"
  )
  .option(
    "-c, --config <config.yaml>",
    "Config file of node-sys",
    "node-sys.yaml"
  )
  .option("-d, --display", "Display default configuration");

program.on("--help", function() {
  console.log("");
  console.log("Examples:");
  console.log("  $ custom-help --help");
  console.log("  $ custom-help -h");
});

// const pingOptions = {
//   target : 'www.google.f'
// }
// const pingin = new NetPingInput(pingOptions,[stdout]);

// (async () => {
//   let response = await pingin.start();
// })();

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

async function stop() {
  await sleep(100000);
  currentInput.stop();
  currentOutput.stop();
  clearInterval(statsId);
  process.exit(0);
}

// INPUTS
let inOptions = NsInput.getDefaultOptions();
// const currentInput = NsInput.New('SysInfoInput').setOptions(inOptions).start();
const currentInput = NsInput.New('SysUsageInput').setOptions(inOptions).start();


// OUTPUTS
let outOptions = {};
let currentOutput = null;
outOptions = NsInput.getDefaultOptions();
currentOutput = NsOutput.New('stdOutput').setOptions(outOptions).start();
currentInput.addOutput(currentOutput);

// outOptions = NsInput.getDefaultOptions();
// currentOutput = NsOutput.New('CsvOutput').setOptions(outOptions).start();
// currentInput.addOutput(currentOutput);


let statsId = setInterval(() => {
  console.log("Input : ", currentInput.getStatistics());
  console.log("Output : ", currentOutput.getStatistics());
},20000)

program.parse(process.argv);
stop();
