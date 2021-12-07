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
        var color = [];
        var rand = Math.random();//[0,1)
        color[0] = Math.floor(rand * 256);
        color[1] = Math.floor(rand * 256);
        color[2] = Math.floor(rand * 256);
        color[3] = 255;
        return color;
    }
}

export { WhiteNoise };