import { promises as fs } from 'fs';
import conf from './conf/conf.js';
import ioServer from './lib/io.js';
import State from './lib/state.js';
import { asyncTimeout, scanIps } from './lib/utils.js';

process.on('SIGINT', () => process.exit());

const version = process.env.MYNAMON_VERSION || 'dev';
console.log(`mynamon build ${version}`);

if (process.argv[2] === '--version') {
  process.exit(0);
}

console.log(conf);

const { subnet, timeout, port, root, limit, file } = conf;

(async () => {
  let initialState = [];
  try {
    initialState = await fs.readFile(file);
    initialState = JSON.parse(initialState);
  } catch (e) {
    console.log(e);
  }
  const state = new State({ limit, initialState });
  state.addSubscriber((s) => fs.writeFile(file, JSON.stringify(s, undefined, 2)));

  const io = ioServer(port, root);
  io.on('connection', (socket) => {
    const id = state.addSubscriber((s) => socket.emit('state', s));
    socket.on('disconnect', () => {
      state.removeSubscriber(id);
    });
  });

  const infiniteScanner = async () => {
    const result = await scanIps(subnet);
    state.addIncrement(result);
    await asyncTimeout(timeout);
    await infiniteScanner();
  };
  infiniteScanner();
})();
