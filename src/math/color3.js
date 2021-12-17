import {Vector3} from './vector3.js';
class Color3 extends Vector3 {
    constructor( r=1, g=1, b=1 ) {
		super(r,g,b);
	}
    get r(){
        return this.x;
    }
    set r(val){
        return this.x = val;
    }
    get g(){
        return this.y;
    }
    set g(val){
        return this.y = val;
    }
    get b(){
        return this.z;
    }
    set b(val){
        return this.z = val;
    }
    rand(){
		this.r = Math.random();
		this.g = Math.random();
		this.b = Math.random();
        return this;
    }
    //color range from 0 to 255 has steps 256
    to_arr(steps){
        return [Math.floor(this.r * steps),Math.floor(this.g * steps),Math.floor(this.b * steps)];
    }
}
export {Color3};