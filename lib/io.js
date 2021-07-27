import { createServer } from 'http';
import { Server } from 'socket.io';

const index = () => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>mynamon</title>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      const socket = io();
      socket.on('connect', () => document.getElementById('socket').innerHTML = "socket connected");
      socket.on('disconnect', () => document.getElementById('socket').innerHTML = "socket disconnected");      
      socket.on('state', (state) => document.getElementById('state').innerHTML = JSON.stringify(state, null, 2));
    </script>
    <style>
      body { margin: 1em; }
      pre { border: 1px solid; min-height: 1em; }
    </style>  
  </head>
  <body>
    <pre id="socket"></pre>
    <pre id="state"></pre>
  </body>
</html>`;
};

export default class {
  constructor ({ port = 8300, root = '' } = {}) {
    const httpServer = createServer(async (req, res) => {
      if (req.url === `${root}/`) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const html = index();
        res.end(html);
      } else {
        res.writeHead(404);
        res.end();
      }
    }).listen(port);

    this.server = new Server(httpServer, {});
  }
}