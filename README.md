[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

# mynamon
Node.js server scanning and monitoring the devices in your local network, running on socket.io.

## Usage (docker)

```
docker pull ghcr.io/asc8277/mynamon:latest
docker run -p 8300:8300 -v /path/to/local/persistence:/mynamon ghcr.io/asc8277/mynamon:latest
```

by default, the webapp is available at localhost:8300/mynamon

## Usage (node)

```
npm ci
npm start
```

by default, the webapp is available at localhost:8300/mynamon

## Configuration
via environment:
```
MYNAMON_SUBNET  the subnet to scan                                 default 192.168.0.0/24
MYNAMON_TIMEOUT the timeout between scans in milliseconds          default 900000 (15 minutes)
MYNAMON_PORT    the port to run the server                         default 8300
MYNAMON_ROOT    the root path of the app (if behind reverse proxy) default "/mynamon"
MYNAMON_LIMIT   the maximum number of history entries              default 1000
MYNAMON_FILE    the persistence ("database") file                  default "mymanom.db"
```

## Development

```
npm run dev
```

## License

Licensed under MIT license

Copyright (c) 2021 Andreas Schmidt

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
