import find from 'local-devices';

const scanIps = async (subnet) => {
  const results = await find(subnet);
  return {
    time: new Date().toISOString(),
    results: results.reduce((acc, cur) => {
      return { ...acc, [cur.ip]: cur.name };
    }, {})
  };
};

const asyncTimeout = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export { asyncTimeout, scanIps };
