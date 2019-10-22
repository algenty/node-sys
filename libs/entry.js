const NS_CONSTANTS = require('./constants');
class NsEntry {
  constructor() {
    this._nsEntOps = NsEntry.getDefaultOptions();
    this._nsEntStats = NsEntry._nsEntStatsFactory();
    this._nsEntLine = NsEntry._nsEntLineFactory();
    this._nsEntStatus = NsEntry._nsEntStatusFactory();
    this._nsEntOutputs = NsEntry._nsEntStatusFactory();

  }

  static getDefaultOptions() {
    return {
      type: NsEntry.constructor.name,
      name: "No name",
      interval: 5000,
      bufferSize: 100,
      debug: false
    };
  }

  getOptions() {
    return this._nsEntOps;
  }

  static New(entryName,type) {
    let childName = (entryName !=null && entryName.length > 0) ? entryName : this.prototype.constructor.name;
    let entry = require(`../${type}/${childName}`);
    var nsEntry = new entry();
    return nsEntry;
  }

  static _nsEntStatusFactory() {
    return {
      ctrl: NS_CONSTANTS.CTRL.STOP,
    };
  }

  static _nsEntOutputsFactory() {
    return [];
  }

  static _nsEntLineFactory() {
    return {
      status: NS_CONSTANTS.STATUS.UNKNOWN,
      beginAt: Date.now(),
      endAt: null,
      duration: 0,
      result: null
    };
  }

  static _nsEntStatsFactory() {
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
    this._nsEntOps = nsOptions;
    return this;
  }

  setName(str) {
    this.getOptions().name = str;
    return this;
  }

  getOutputs() {
    return this._nsOutputsArray;
  }

  addOutput(output) {
    this.getOutputs().push(output);
  }

  exec(ent) {
    // FOR CHILDREN
  }

  async _ent(nsEnt) {
    if (
      this._nsEntStatus.ctrl === NS_CONSTANTS.CTRL.START &&
      this._nsEntLine.status !== NS_CONSTANTS.STATUS.INPROGRESS
    ) {
      this._nsEntStats.execCount++;
      let currNsLine = NsEntry._nsEntLineFactory();
      this._nsEntLine = currNsLine;
      currNsLine.status = NS_CONSTANTS.STATUS.INPROGRESS;
      currNsLine.result = this.exec(nsEnt.result);
      currNsLine.endAt = Date.now();
      if (this._nsEntLine.status === NS_CONSTANTS.STATUS.INPROGRESS) {
        this._nsEntStats.unknownCount++;
        currNsLine.status = NS_CONSTANTS.STATUS.UNKNOWN;
      }
      currNsLine.duration = currNsLine.endAt - currNsLine.beginAt;
      this._nsEntStats.totalTime += currNsLine.duration;
    }
  }

  start() {
    this._nsEntStatus.ctrl = NS_CONSTANTS.CTRL.START;
    this._nsEntStats.startAt = Date.now();
    this.init();
    return this;
  }

  stop() {
    this._nsEntStats.endAt = Date.now();
    this.close();
    return this;
  }

  init() {
    console.log("NSENTRY INIT");
    return this;
  }

  close() {
    console.log("NSENTRY CLOSE");
    return this;
  }

  failed() {
    this._nsEntLine.status = NS_CONSTANTS.STATUS.FAILED;
    this._nsEntStats.failedCount++;
    return this;
  }

  success() {
    this._nsEntLine.status = NS_CONSTANTS.STATUS.SUCCESS;
    this._nsEntStats.successCount++;
    return this;
  }
  
  getStatistics() {
    return this._nsEntStats;
  }

}

module.exports = NsEntry;