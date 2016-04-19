import EventEmitter from "wolfy87-eventemitter";

export interface IMotionEvent {
	y: number,
	x: number,
}

export class Accelerometer extends EventEmitter {

	constructor() {
		super();
		window.addEventListener('devicemotion', this.onSensor.bind(this), false);
	}

	private onSensor(event: DeviceMotionEvent) {
		let x = ~~(event.accelerationIncludingGravity.x * 10);
		let y = ~~(event.accelerationIncludingGravity.y * 10);

		let motion: IMotionEvent = {
			x: x,
			y: y,
		};

		this.emit('motion', motion);
	}
}