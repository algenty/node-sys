const NsInput = require("../libs/input");
const SystemHealthMonitor = require("system-health-monitor");
const os = require('os');

//See https://www.npmjs.com/package/pc-stats

class SysUsageInput extends NsInput {
  constructor() {
    super();
  }

  init() {
    // initialisation of output whan start is called
    console.log("init");
    var self = this;
    self.SystemHealthMonitor = require("system-health-monitor");
    const monitorConfig = {
      checkIntervalMsec: 5000,
      mem: {
        thresholdType: "none",
      },
      cpu: {
        calculationAlgo: "last_value",
        thresholdType: "none"
      }
    };
    self.monitor = new SystemHealthMonitor(monitorConfig);
    self.monitor.start()
  }

  close() {
    // initialisation of output whan stop is called
    console.log("init");
    this.monitor.stop();
  }

  /**
   *
   *
   * @param {Out Properties} out
   * @memberof StdOutput
   */
  exec() {
    // Add your code for output to output, must be a propertie object
    let out = null;
    let self = this;
    out = {
      timestamp : Date.now(),
      host : os.hostname(),
      cpucount : self.monitor.getCpuCount(),
      cpuusage : self.monitor.getCpuUsage(),
      memtotal : self.monitor.getMemTotal(),
      memfree : self.monitor.getMemFree(),
    }
    let success = true;
    if (success) this.success();
    else this.failed();
    return out;
  }
}

module.exports = SysUsageInput;
