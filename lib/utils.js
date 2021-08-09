import find from 'local-devices';

const scanIps = async (subnet) => {
  const results = await find(subnet);
  return {
    time: new Date().toISOString(),
    results: results.reduce((acc, cur) => {
      const { ip, mac, name } = cur;
      acc[mac || name || ip] = { name, mac, ip };
      return acc;
    }, {})
  };
};

const asyncTimeout = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export { asyncTimeout, scanIps };
