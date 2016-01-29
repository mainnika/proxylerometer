import * as express from "express";
import * as http from "http";
import * as sockjs from "sockjs";

import {Clients} from './clients';
import {initGlobals} from './globals';
import {Sessions} from './sessions';

let sockjs_opts = {
	sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"
};

let clients: Clients = new Clients();
let sessions: Sessions = new Sessions();

initGlobals({
	clients: clients,
	sessions: sessions,
});

let app = express();
app.use(express.static('webapp'));

let server = http.createServer();
server.on('request', app);

let wss = sockjs.createServer(sockjs_opts);
wss.installHandlers(server, {prefix: '/connect'});
wss.on('connection', clients.createConnection.bind(clients));

server.listen(9000, '0.0.0.0');