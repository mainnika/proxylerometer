import {Clients} from './clients';

interface IGlobals {
	[name: string]: any;
}

class __Globals {

	private _globals: IGlobals;

	constructor(globals: IGlobals) {
		this._globals = globals;
	}

	public get clients(): Clients {
		return this._globals['clients'];
	}
}

export var Globals: __Globals = null;
export function initGlobals(init: IGlobals) {
	Globals = new __Globals(init);
}