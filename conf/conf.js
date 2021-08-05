export default {
  subnet: process.env.MYNAMON_SUBNET || '192.168.0.0/24',
  timeout: process.env.MYNAMON_TIMEOUT || 15 * 60 * 1000,
  port: process.env.MYNAMON_PORT || 8300,
  root: process.env.MYNAMON_ROOT || '/mynamon',
  limit: process.env.MYNAMON_LIMIT || 1000
};
