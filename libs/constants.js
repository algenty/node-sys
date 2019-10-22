"use strict";
const NS_CONSTANTS = {
  CTRL: {
    STOP: 'stop',
    START: 'start',
    PAUSE: 'pause',
    RESUME: 'resume',
  },
  STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
    INPROGRESS: 'inprogress',
    UNKNOWN: 'unknown',
    WAITING: 'waiting',
  }
};

module.exports =  Object.freeze(NS_CONSTANTS); 
