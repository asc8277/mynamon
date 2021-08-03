import find from 'local-devices';

export default async (subnet) => {
  const results = await find(subnet);
  return {
    time: new Date().toISOString(), 
    results
  };
}
