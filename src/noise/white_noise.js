import { Noise } from './noise.js';

class WhiteNoise extends Noise {
    constructor() {
        super();
    }
    set_params(params) {
    }
    init() {

    }
    make(uv_arr) {
        if (this.variant_no == 1) {
            return this.make1(uv_arr);
        }else if(this.variant_no == 2){
            return this.make2(uv_arr);
        }else{
            return uv_arr;
        }
    }
    //every component of Color has same value 
    make1(uv_arr) {
        var color = [];
        var rand = Math.random();//[0,1)
        color[0] = Math.floor(rand * 256);
        color[1] = Math.floor(rand * 256);
        color[2] = Math.floor(rand * 256);
        color[3] = 255;
        return color;
    }
    //every component of Color has different value 
    make2(uv_arr){
        var color = [];
        color[0] = Math.floor( Math.random() * 256);
        color[1] = Math.floor( Math.random() * 256);
        color[2] = Math.floor( Math.random() * 256);
        color[3] = 255;
        return color;
    }
}

export { WhiteNoise };