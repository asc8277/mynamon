import ioServer from './lib/ioServer.js';
import State from './lib/state.js';
import scan from './lib/scan.js';

const version = process.env.MYNAMON_VERSION || 'dev';
console.log(`mynamon build ${version}`);

if (process.argv[2] === '--version') {
  process.exit(0);
}

const conf = {
  subnet: process.env.MYNAMON_SUBNET || '192.168.0.0/24',
  timeout: process.env.MYNAMON_TIMEOUT || 15 * 60 * 1000,
  port: process.env.MYNAMON_PORT || 8300,
  root: process.env.MYNAMON_ROOT || ''
};
console.log(conf);

const { subnet, timeout, port, root } = conf;

const state = new State();
const asyncTimeout = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const io = ioServer(port, root);

io.on('connection', (socket) => {
  const id = state.addSubscriber((state) => socket.emit('state', state));
  socket.on('disconnect', () => {
    state.removeSubscriber(id);
  });
});

const infiniteScanner = async () => {
  const result = await scan(subnet);
  state.setState(result);
  await asyncTimeout(timeout);
  await infiniteScanner();
};

infiniteScanner();
