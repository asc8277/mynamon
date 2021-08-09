import { promises as fs } from 'fs';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

const localdir = path.dirname(fileURLToPath(import.meta.url));

export default (port = 3000, root = '') => {
  return new Server(createServer(async (req, res) => {
    console.log(req.url);
    if (req.url.match(`^${root}/?$`)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const fileContent = await fs.readFile(path.resolve(localdir, '../app/app.html'));
      const html = eval('`' + fileContent + '`'); // eslint-disable-line no-eval
      res.end(html);
    } else if (req.url.match(`^${root}/app.js$`)) {
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      const js = await fs.readFile(path.resolve(localdir, '../app/app.js'));
      res.end(js);
    } else {
      res.writeHead(404);
      res.end();
    }
  }).listen(port), { path: `${root}/socket.io` });
};
