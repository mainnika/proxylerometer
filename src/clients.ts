import * as sockjs from "sockjs";

export class Client {

	private _conn: sockjs.Connection;
	private _id: number;

	constructor(conn: sockjs.Connection, id: number) {

		this._conn = conn;
		this._id = id;

		this._conn.on('data', this.onMessage.bind(this));
	}

	public onMessage(message: string): void {

		try {
			var obj: any = JSON.parse(message);
		}
		catch (err) {
			return;
		}
	}

	public get conn(): sockjs.Connection {

		return this._conn;
	}

	public get id(): number {

		return this._id;
	}
}

export class Clients {

	private _clients: Array<Client>;

	constructor() {

		this._clients = [];
	}

	public createConnection(conn: sockjs.Connection) {

		let id: number = this._clients.length;
		let client: Client = new Client(conn, id);

		this._clients.push(client);

		conn.once('close', this.removeConnection.bind(this, client));
	}

	public removeConnection(client: Client) {

		let id: number = client.id;

		this._clients[id] = null;
	}

	public getClient(id: number): Client {

		return this._clients[id];
	}
}
