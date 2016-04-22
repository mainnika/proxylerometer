import * as sockjs from 'sockjs';
import {Globals} from './globals';

export class Client {

    private _conn: sockjs.Connection;
    private _id: number;

    constructor(conn: sockjs.Connection, id: number) {

        this._conn = conn;
        this._id = id;

        this._conn.on('data', this.onMessage.bind(this));

        console.log(`Client ${this._id} connected`);
    }

    public onMessage(message: string): void {

        try {
            var obj: any = JSON.parse(message);
        }
        catch (err) {
            return;
        }

        switch (true) {
            case (obj.join !== undefined):
                this.joinSession(obj.join);
                break;

            case (obj.input !== undefined):
                this.receiveInput(obj.input);
                break;

            case (obj.fire !== undefined):
                this.receiveFire();
                break;

            default:
                this._conn.write(JSON.stringify({
                    error: 'unknow'
                }));
                return;
        }
    }

    private joinSession(id: string): void {

        console.log(`Client ${this._id} want to join session ${id}`);

        this._conn.write(JSON.stringify({
            joined: Math.random()
        }));
    }

    private receiveInput(input: any): void {

        console.log(input);
    }

    private receiveFire(): void {

        console.log('Fired');
    }

    public disconnected(): void {

        this._conn.close();
        console.log(`Client ${this._id} disconnected`);
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

        client.disconnected();

        let id: number = client.id;

        this._clients[id] = null;
    }

    public getClient(id: number): Client {

        return this._clients[id];
    }
}
