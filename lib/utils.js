const asyncTimeout = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export { asyncTimeout };
