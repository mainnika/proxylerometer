import EventEmitter from "wolfy87-eventemitter";

export interface IMotionEvent {
	y: number,
	x: number,
}

export class Accelerometer extends EventEmitter {
    
    private _inversed: boolean;
    private _calibrated: boolean;

	constructor() {
		super();
        
        this._calibrated = false;
        this._inversed = false;
        
		window.addEventListener('devicemotion', this.onSensor.bind(this), false);
	}

	private onSensor(event: DeviceMotionEvent) {
        
        if (!this._calibrated) {
            this._inversed = event.accelerationIncludingGravity.y < 0;
            this._calibrated = true; 
        }
        
		let x = ~~(event.accelerationIncludingGravity.x * 10);
		let y = ~~(event.accelerationIncludingGravity.y * (this._inversed ? -10 : 10));

		let motion: IMotionEvent = {
			x: x,
			y: y,
		};

		this.emit('motion', motion);
	}
}