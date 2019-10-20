const NS_CONSTANTS = require('./constants');
class NsOutput {
  constructor(nsOutOps) {
    this._nsOutOps = NsOutput.getDefaultOptions();
    this._nsOutStats = NsOutput._nsOutStatsFactory();
    this._nsOutLine = NsOutput._nsOutLineFactory();
    this._nsOutStatus = NsOutput._nsOutStatusFactory();

  }

  static getDefaultOptions() {
    return {
      type: NsOutput.constructor.name,
      name: "No name",
      interval: 5000,
      bufferSize: 100,
      debug: false
    };
  }

  getOptions() {
    return this._nsOutOps;
  }

  static New(outputName) {
    let childName = (outputName !=null && outputName.length > 0) ? outputName : this.prototype.constructor.name;
    let output = require(`../outputs/${childName}`);
    var nsOutput = new output();
    return nsOutput;
  }

  static _nsOutStatusFactory() {
    return {
      ctrl: NS_CONSTANTS.CTRL.STOP,
    };
  }

  static _nsOutLineFactory() {
    return {
      status: NS_CONSTANTS.STATUS.UNKNOWN,
      beginAt: Date.now(),
      endAt: null,
      duration: 0,
      result: null
    };
  }

  static _nsOutStatsFactory() {
    return {
      startAt: null,
      stopAt: null,
      pauseAt: null,
      stopAt: null,
      totalTime: 0,
      execCount: 0,
      successCount: 0,
      failedCount: 0,
      unknownCount: 0,
    };
  }

  setOptions(nsOptions){
    this._nsOutOps = nsOptions;
    return this;
  }

  setName(str) {
    this.getOptions().name = str;
    return this;
  }

  exec(out) {
    // FOR CHILDREN
  }

  async _out(nsOut) {
    if (
      this._nsOutStatus.ctrl === NS_CONSTANTS.CTRL.START &&
      this._nsOutLine.status !== NS_CONSTANTS.STATUS.INPROGRESS
    ) {
      this._nsOutStats.execCount++;
      let currNsLine = NsOutput._nsOutLineFactory();
      this._nsOutLine = currNsLine;
      this._nsOutLine.status = NS_CONSTANTS.STATUS.INPROGRESS;
      currNsLine.result = this.exec(nsOut.result);
      currNsLine.endAt = Date.now();
      if (this._nsOutLine.status === NS_CONSTANTS.STATUS.INPROGRESS) {
        this._nsOutStats.unknownCount++;
        currNsLine.status = NS_CONSTANTS.STATUS.UNKNOWN;
      }
      currNsLine.duration = currNsLine.endAt - currNsLine.beginAt;
      this._nsOutStats.totalTime += currNsLine.duration;
    }
  }

  start() {
    this._nsOutStatus.ctrl = NS_CONSTANTS.CTRL.START;
    this._nsOutStats.startAt = Date.now();
    this.init();
    return this;
  }

  stop() {
    this.close();
  }

  init() {
    console.log("INIT");
    return this;
  }

  close() {
    console.log("CLOSE");
    return this;
  }

  failed() {
    this._nsOutLine.status = NS_CONSTANTS.STATUS.FAILED;
    this._nsOutStats.failedCount++;
  }

  success() {
    this._nsOutLine.status = NS_CONSTANTS.STATUS.SUCCESS;
    this._nsOutStats.successCount++;
  }
  getStatistics() {
    return this._nsOutStats;
  }

}

module.exports = NsOutput;