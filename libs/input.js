const NS_CONSTANTS = require("./constants");

class NsInput {
  constructor(nsInOps, nsOutputsArray) {
    this._nsOutputsArray = nsOutputsArray;
    this._nsInOps = {
      type: this.constructor.name,
      name: "DEFAULT",
      interval: 5000,
      bufferSize: 100,
      debug: false
    };
    this._nsOutputsArray = nsOutputsArray;

    this._nsInStats = this._nsInStatsFactory();
    this._nsInStatus = this._nsInStatusFactory();
    this._nsInLine = this._nsInLineFactory();

  }

  _nsInStatusFactory() {
    return {
      ctrl: NS_CONSTANTS.CTRL.STOP,
      startId: 0
    };
  }

  _nsInStatsFactory() {
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

  _nsInLineFactory() {
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
    this.open();
    this._nsInStatus.startId = setInterval(this._exec.bind(this), 2000);
    return this;
  }

  open() {
    // FOR CHILDREN
  }

  _exec() {
    this._in();
  }

  async _out(outputs, nsOut) {
    outputs._out(nsOut);
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
      let currNsLine = this._nsInLineFactory();
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
