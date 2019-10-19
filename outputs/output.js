const STATE_SUCCESS = 1;
const STATE_FAIL = 0;


class NsOutput {
  constructor() {
    this.defaultOptions = {
      type : this.constructor.name,
      name : 'DEFAULT'
    }

    this.defaultStatistics = {
      successCount : 0,
      failedCount : 0,
      totalTime : 0,
      executeCount: 0,
      startTime: Date.now()
    }
    this.currentState = STATE_SUCCESS
  }


  failed(out) {
    if(out) this.out(out,STATE_FAIL);
    else this.defaultStatistics.failedCount++;
    return this;
  }

  success(out) {
    if(out) this.out(out,STATE_FAIL);
    else this.defaultStatistics.failedCount++;
    return this;
  }

  out(out,state) {
    if(state == STATE_FAIL) this.defaultStatistics.failedCount++;
    if(state == STATE_SUCCESS) this.defaultStatistics.successCount++;
    return this;
  }

  isSuccess() {
    return (this.currentState == STATE_SUCCESS);
  }

  isFailed() {
    return (this.currentState != STATE_SUCCESS);
  }

  start() {

  }

  stop() {

  }

  call() {

  }

  on(event,func) {
    return this;
  }
}
module.exports = NsOutput;