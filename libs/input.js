const NS_CONSTANTS = require("./constants");

class NsInput {
  constructor(nsInOps, nsOutputsArray) {
    this._nsOutputsArray = nsOutputsArray;
    this._nsInOps = nsInOps != null ? nsInOps : NsInput.getDefaultOptions();
    this._nsOutputsArray = nsOutputsArray != null ? nsOutputsArray : [];

    this._nsInStats = NsInput._nsInStatsFactory();
    this._nsInStatus = NsInput._nsInStatusFactory();
    this._nsInLine = NsInput._nsInLineFactory();
  }

  /**
   *Return default options
   *
   * @static
   * @returns
   * @memberof NsInput
   */
  static getDefaultOptions() {
    return {
      type: NsInput.constructor.name,
      name: "No name",
      interval: 5000,
      bufferSize: 100,
      debug: false
    };
  }

  /**
   *Return current options
   *
   * @returns
   * @memberof NsInput
   */
  getOptions() {
    return this._nsInOps;
  }

  /**
   *Create new input
   *
   * @static
   * @param {*} nsInOps
   * @param {*} nsOutputsArray
   * @returns
   * @memberof NsInput
   */
  static New(inputName) {
    let childName =
      inputName != null && inputName.length > 0
        ? inputName
        : this.prototype.constructor.name;
    let input = require(`../inputs/${childName}`);
    var nsInput = new input();
    return nsInput;
  }

  static _nsInStatusFactory() {
    return {
      ctrl: NS_CONSTANTS.CTRL.STOP,
      startId: 0
    };
  }

  static _nsInStatsFactory() {
    return {
      startAt: null,
      stopAt: null,
      pauseAt: null,
      stopAt: null,
      totalTime: 0,
      execCount: 0,
      successCount: 0,
      failedCount: 0,
      unknownCount: 0
    };
  }

  static _nsInLineFactory() {
    return {
      status: NS_CONSTANTS.STATUS.UNKNOWN,
      beginAt: Date.now(),
      endAt: null,
      duration: 0,
      result: null
    };
  }

  start() {
    this._nsInStatus.ctrl = NS_CONSTANTS.CTRL.START;
    this._nsInStats.startAt = Date.now();
    this.init();
    this._nsInStatus.startId = setInterval(this._exec.bind(this), 2000);
    return this;
  }

  setOptions(nsOptions) {
    this._nsInOps = nsOptions;
    return this;
  }

  setOutputs(outputs) {
    this._nsOutputsArray = outputs;
    return this;
  }

  addOutput(output) {
    this._nsOutputsArray.push(output);
    return this;
  }

  setName(str) {
    this.getOptions().name = str;
    return this;
  }

  setInterval(num) {
    this.getOptions().interval = num;
    return this;
  }

  init() {
    console.log("INIT");
    return this;
  }

  close() {
    console.log("CLOSE");
    return this;
  }

  _exec() {
    this._in();
  }

  async _out(outputs, nsOut) {
    if (outputs != null && outputs.length > 0) {
      outputs.forEach(ouput => {
        ouput._out(nsOut);
      });
    }
  }

  exec() {
    // FOR CHILDREN
    return null;
  }

  async _in() {
    if (
      this._nsInStatus.ctrl === NS_CONSTANTS.CTRL.START &&
      this._nsInLine.status !== NS_CONSTANTS.STATUS.INPROGRESS
    ) {
      this._nsInStats.execCount++;
      let currNsLine = NsInput._nsInLineFactory();
      this._nsInLine = currNsLine;
      this._nsInLine.status = NS_CONSTANTS.STATUS.INPROGRESS;
      currNsLine.result = this.exec();
      currNsLine.endAt = Date.now();
      if (this._nsInLine.status === NS_CONSTANTS.STATUS.INPROGRESS) {
        currNsLine.status = NS_CONSTANTS.STATUS.UNKNOWN;
        this._nsInStats.unknownCount++;
      }
      currNsLine.duration = currNsLine.endAt - currNsLine.beginAt;
      this._nsInStats.totalTime += currNsLine.duration;
      this._out(this._nsOutputsArray, currNsLine);
    }
  }

  failed() {
    this._nsInLine.status = NS_CONSTANTS.STATUS.FAILED;
    this._nsInStats.failedCount++;
  }

  success() {
    this._nsInLine.status = NS_CONSTANTS.STATUS.SUCCESS;
    this._nsInStats.successCount++;
  }

  stop() {
    this._nsInStatus.ctrl = NS_CONSTANTS.CTRL.STOP;
    this.close();
    clearInterval(this._nsInStatus.startId);
    return this;
  }

  async resume() {
    this._nsInStatus.ctrl = NS_CONSTANTS.CTRL.RESUME;
    return this;
  }

  getStatistics() {
    return this._nsInStats;
  }

  setTimestamp(time) {
    return this;
  }

  on(event, func) {}
}

module.exports = NsInput;
