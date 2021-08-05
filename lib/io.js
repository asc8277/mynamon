import { createServer } from 'http';
import { Server } from 'socket.io';

const index = (root) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>mynamon</title>
    <script src="${root}/socket.io/socket.io.js"></script>
    <script>
      const socket = io({ path: "${root}/socket.io" });
      socket.on('connect', () => document.getElementById('socket').innerHTML = "socket connected");
      socket.on('disconnect', () => document.getElementById('socket').innerHTML = "socket disconnected");
      socket.on('state', (result) => {
        document.getElementById('state').innerHTML = JSON.stringify(result.state, null, 2);
        let history = '';
        const allIps = result.history.reduce((acc, cur) => ( { ...acc, ...cur.results } ), {});
        Object.keys(allIps).forEach(ip => {
          history += ip.padStart(15) + ' ';
          result.history.forEach(s => history += s.results[ip] ? '*' : ' ');
          history += '\\n';
        });
        document.getElementById('history').innerHTML = history;
      });
    </script>
    <style>
      body { margin: 1em; }
      pre { border: 1px solid; min-height: 1em; overflow-x: auto; }
    </style>
  </head>
  <body>
    <pre id="socket"></pre>
    <pre id="state"></pre>
    <pre id="history"></pre>
  </body>
</html>`;
};

export default (port = 3000, root = '') => {
  return new Server(createServer(async (req, res) => {
    if (req.url.match(`^${root}/?$`)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const html = index(root);
      res.end(html);
    } else {
      res.writeHead(404);
      res.end();
    }
  }).listen(port), { path: `${root}/socket.io` });
};
