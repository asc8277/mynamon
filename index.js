import Io from './lib/io.js';
import State from './lib/state.js';
import Scanner from './lib/scanner.js';

const version = process.env.MYNAMON_VERSION || 'dev';
console.log(`mynamon build ${version}`);

if (process.argv[2] === '--version') {
  process.exit(0);
}

const base = process.env.MYNAMON_BASE || '192.168.1';
const dns = process.env.MYNAMON_DNS || `${base}.1`;
const timeout = process.env.MYNAMON_TIMEOUT || 15 * 60 * 1000;
const port = process.env.MYNAMON_PORT || 8300;
const root = process.env.MYNAMON_ROOT || '';

const state = new State();
const scanner = new Scanner({ base, dns });
const asyncTimeout = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const io = new Io({ port, root }).server;

io.on('connection', (socket) => {
  const id = state.addSubscriber((state) => socket.emit('state', state));
  socket.on('disconnect', () => {
    state.removeSubscriber(id);
  });
});

const infiniteScanner = async () => {
  const result = await scanner.scan();
  state.setState(result);
  await asyncTimeout(timeout);
  await infiniteScanner();
};

infiniteScanner();
