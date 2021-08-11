import find from 'local-devices';
import { asyncTimeout } from './utils.js';

class Scanner {
  constructor (subnet = '', timeout = 5000, cb = () => {}) {
    this.subnet = subnet;
    this.timeout = timeout;
    this.cb = cb;
  }

  async scanIps () {
    const results = await find(this.subnet);
    return {
      time: new Date().toISOString(),
      results: results.reduce((acc, cur) => {
        return { ...acc, [cur.ip]: cur.name };
      }, {})
    };
  };

  async infiniteScan () {
    const result = await this.scanIps();
    this.cb.apply(this.cb, [result]);
    await asyncTimeout(this.timeout);
    await this.infiniteScan();
  }
}

export default Scanner;
