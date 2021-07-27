import ping from 'ping';
import { promises as dnsLookup } from 'dns';

export default class {
  constructor ({ base = '192.168.1', dns = '192.168.1.1' } = {}) {
    this.base = base;
    this.dns = dns;
  }

  async scan () {
    const ips = new Array(253).fill().map((e, i) => `${this.base}.${i + 1}`);
    const results = await Promise.all(ips.map(async (ip) => {
      let alive = false;
      try {
        ({ alive } = await ping.promise.probe(ip, { timeout: 15 }));
      } catch (e) {
        // 🤷
      }

      if (!alive) {
        return;
      }

      let hostnames = [];
      try {
        dnsLookup.setServers([this.dns]);
        hostnames = await dnsLookup.reverse(ip);
      } catch (e) {
        // 🤷
      }

      return {
        ip,
        hostname: hostnames[0] || ''
      };
    }));

    return {
      time: new Date().toISOString(),
      results: results.filter(r => r)
    };
  }
}
