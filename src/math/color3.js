import {Vector3} from './vector3.js';
class Color3 extends Vector3 {
    constructor( r=255, g=255, b=255 ) {
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
		this.r = Math.floor(Math.random() * 256);
		this.g = Math.floor(Math.random() * 256);
		this.b = Math.floor(Math.random() * 256);
        return this;
    }
    to_arr(){
        return [this.r,this.g,this.b];
    }
}
export {Color3};