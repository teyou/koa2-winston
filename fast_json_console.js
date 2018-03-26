const winston = require('winston');
const os = require('os');

class FastJsonConsoleTransport extends winston.Transport {
  constructor(options = {}) {
    super();

    this.stringify = options.stringify || JSON.stringify;
  }
  log(level, message, meta, callback) {
    const output = this.stringify(Object.assign({ message, level }, meta));
    if (level === 'error') {
      process.stderr.write(output + os.EOL);
    } else {
      process.stdout.write(output + os.EOL);
    }

    this.emit('logged');
    callback(null, true);
  }
}

module.exports = FastJsonConsoleTransport;
