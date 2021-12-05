class Color {
    constructor( r=255, g=255, b=255 ,a=255) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}
    copy(v) {
		this.r = v.r;
		this.g = v.g;
		this.b = v.b;
		this.a = v.a;
        return this;
    }
    rand(){
		this.r = Math.floor(Math.random() * 256);
		this.g = Math.floor(Math.random() * 256);
		this.b = Math.floor(Math.random() * 256);
        return this;
    }
    rand_with_alpha(){
		this.r = Math.floor(Math.random() * 256);
		this.g = Math.floor(Math.random() * 256);
		this.b = Math.floor(Math.random() * 256);
        this.a = Math.floor(Math.random() * 256);
        return this;
    }
    multiply_scalar(scalar){
        this.r *= scalar;
		this.g *= scalar;
		this.b *= scalar;
        return this; 
    }
    to_arr(){
        return [this.r,this.g,this.b,this.a];
    }
}
export {Color};