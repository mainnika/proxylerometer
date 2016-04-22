import * as sockjs from 'sockjs';
import {Client} from './clients';

export class Session {

	private _id: string;
	private _conn: sockjs.Connection;
	private _clients: {[id: number]: Client};

	constructor(conn: sockjs.Connection, id: string) {

		this._conn = conn;
		this._id = id;
		this._clients = {};
		
		this._conn.on('data', this.onMessage.bind(this));
		this._conn.write(JSON.stringify({
			id: this._id
		}));

		console.log(`Session ${this._id} created`);
	}
	
	public onMessage(message: string): void {

		try {
			var obj: any = JSON.parse(message);
		}
		catch (err) {
			return;
		}

		switch (true) {
			case (obj.kicked !== undefined):
				this.kicked(obj.kicked);
				break;
				
			case (obj.hit !== undefined):
				this.hit(obj.hit);
				break;

			default:
				this._conn.write(JSON.stringify({
					error: 'unknow'
				}));
				return;
		}
	}

	public get id(): string {

		return this._id;
	}

	public disconnected(): void {
		console.log(`Session ${this._id} disconnected`);

		let clients = [];

		for (let id in this._clients) {
			if (!this._clients.hasOwnProperty(id)) {
				continue;
			}

			clients.push(this._clients[id]);
		}

		for (let client of clients) {
			this.left(client);
		}
	}

	public join(client: Client): void {

		this._clients[client.id] = client;

		this._conn.write(JSON.stringify({
			joined: client.id
		}));

		console.log(`Client ${client.id} joined to session ${this._id}`);
	}

	public left(client: Client): void {

		if (!this._clients[client.id]) {
			return;
		}

		delete this._clients[client.id];

		this._conn.write(JSON.stringify({
			left: client.id
		}));

		client.kicked(this);

		console.log(`Client ${client.id} disconnected from session ${this._id}`);
	}

	public input(client: Client, input: any): void {

		this._conn.write(JSON.stringify({
			input: {
				id: client.id,
				motion: input,
			}
		}));
	}

	public fire(client: Client): void {

		this._conn.write(JSON.stringify({
			fire: {
				id: client.id,
			}
		}));
	}
	
	private kicked(id: number){
		let client = this._clients[id];
		if (!client)
			return;
			
		this.left(client);
	}
	
	private hit(id: number){
		
		let client = this._clients[id];
		if (!client)
			return;
			
		client.hit();
	}
}

export class Sessions {

	private _sessions: {[id: string]: Session} = {};

	constructor() {
	}

	public generateSessionId(): string {

		let tryNumber = '';
		let newId = '';

		do {
			newId = `${tryNumber}${~~(Math.random() * 10) + 1}`;
			tryNumber = `${~~(Math.random() * 10) + 1}${tryNumber}`;

		} while (this._sessions[newId]);

		return newId;
	}

	public createSession(conn: sockjs.Connection) {

		let session: Session = new Session(conn, this.generateSessionId());
		this._sessions[session.id] = session;

		conn.on('close', this.removeSession.bind(this, session));
	}

	public removeSession(session: Session): void {

		session.disconnected();

		let id: string = session.id;

		delete this._sessions[id];

	}

	public getSession(id: string): Session {
		return this._sessions[id];
	}
}