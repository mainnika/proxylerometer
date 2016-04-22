import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as sockjs from 'sockjs';

import {Clients} from './clients';
import {initGlobals} from './globals';

let sockjs_opts = {
	sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
};

let clients: Clients = new Clients();

initGlobals({
	clients: clients
});

let app = express();

app.use(express.static(path.resolve(__dirname, '..', 'web')));

let server = http.createServer();
server.on('request', app);

let wssClients = sockjs.createServer(sockjs_opts);
wssClients.installHandlers(server, {prefix: '/connect'});
wssClients.on('connection', clients.createConnection.bind(clients));

server.listen(19000, '0.0.0.0');