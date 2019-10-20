const NS_CONSTANTS = require('./constants');
class NsOutput {
  constructor(nsOutOps) {
    this._nsOutOps = {
      type : this.constructor.name,
      name : 'DEFAULT'
    }

    this._nsOutStats = this._nsOutStatsFactory();
    this._nsOutLine = this._nsOutLineFactory();
    this._nsOutStatus = this._nsOutStatusFactory();

  }

  _nsOutStatusFactory() {
    return {
      ctrl: NS_CONSTANTS.CTRL.STOP,
    };
  }

  _nsOutLineFactory() {
    return {
      status: NS_CONSTANTS.STATUS.UNKNOWN,
      beginAt: Date.now(),
      endAt: null,
      duration: 0,
      result: null
    };
  }

  _nsOutStatsFactory() {
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

  exec(out) {
    // FOR CHILDREN
  }

  async _out(nsOut) {
    if (
      this._nsOutStatus.ctrl === NS_CONSTANTS.CTRL.START &&
      this._nsOutLine.status !== NS_CONSTANTS.STATUS.INPROGRESS
    ) {
      this._nsOutStats.execCount++;
      let currNsLine = this._nsOutLineFactory();
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
    this.open();
  }

  stop() {
    this.close();
  }

  open() {

  }

  close() {
    
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