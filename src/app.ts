import * as express from "express";
import * as http from "http";
import * as sockjs from "sockjs";

let sockjs_opts = {
	sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"
};

let wss = sockjs.createServer(sockjs_opts);
let server = http.createServer();
let app = express();

app.use(express.static('webapp'));

wss.installHandlers(server, {prefix: '/connect'});
wss.on('connection', function (conn) {
	//conn.on('data', function (message) {
	//	conn.write(message);
	//});
	conn.write('PUSH');
	conn.end();
});

server.on('request', app);
server.listen(9000, '0.0.0.0');