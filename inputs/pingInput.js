const ping = require("net-ping");
const dns = require("dns");

class NetPing {
  constructor(options, outputs) {
    // console.log("constructor ", constructor);
    this.target = options.target;
    this.type = this.constructor.name;
    this.ip = null;
    this.outputs = outputs;
    // console.log("outputs ", outputs);
    this.session = ping.createSession();
    // console.log("session ", this.session);
    this.startId;
    this.resolve();
  }

  async start() {
    this.startId = setInterval(this.exec.bind(this), 2000);
  }

  stop() {
    clearInterval(this.startId);
    this.session.close();
  }

  exec() {
    let self = this;
    const output = {
      time: Date.now(),
      type: self.constructor.name,
      target: self.target,
      ip: self.ip
    };

    if (this.ip != null) {
      console.log("this.ip ", this.ip);
      this.session.pingHost(this.ip, function(error, target) {
        if (error) {
          output.status = "error";
          output.error = error.toString;
        } else {
          output.status = "alive";
        }
        this.status = 0;
        self.out(output);
      });
    } else {
      output.status = "error";
      output.error = "Address not solved";
      this.resolve();
      this.status = 1;
      self.out(output);
    }
  }

  resolve() {
    dns.lookup(this.target, (err, address, family) => {
      this.ip = address;
    });
  }

  out(metric) {
    this.outputs.forEach(output => {
      if (this.isSuccess()) output.success(metric);
      else output.failed(metric);
    });
  }

  isSuccess() {
    return !this.status;
  }
}

module.exports = { NetPing };
