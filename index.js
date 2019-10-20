#!/usr/bin/env node

const program = require("commander");
// const NetPingInput = require("./inputs/pingInput").NetPing;
const TestInput = require("./inputs/testInput");
const StdoutOutput = require("./outputs/stdOutput");
const defaultOptions = {
  interval: 3000
};

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
  await sleep(20000);
  testinput.stop();
  stdoutput.stop();
  clearInterval(statsId);

}

let options = {};
const stdoutput = new StdoutOutput();
stdoutput.start();
const testinput = new TestInput(options, stdoutput);
testinput.start();

let statsId = setInterval(() => {
  console.log("Input : ", testinput.getStatistics());
  console.log("Output : ", stdoutput.getStatistics());
},10000)

program.parse(process.argv);
stop();
