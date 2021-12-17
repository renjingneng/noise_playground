import { download } from '../res/download.js';
import { CellNoise } from './noise/cell_noise.js';
import { WhiteNoise } from './noise/white_noise.js';
import { Color3 } from './math/color3.js';
class Manager {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;

        this.image_data = canvas.getContext("2d").getImageData(0, 0, this.width, this.height);
        this.raw_arr_len = this.image_data.data.length;
        //In Javascript objects and arrays follows pass by reference. so if we are passing object or array 
        //as an argument to the method, then there is a possibility that value of the object can change
        this.raw_arr = this.image_data.data;
        this.noise_maker = null;
        this.container = {};
    }
    set_maker(params) {
        // set up noise_maker
        if (this.container[params.noise_type] == null){
            if (params.noise_type == 'white_noise') {
                this.container[params.noise_type] = new WhiteNoise();
            } else if (params.noise_type == 'cell_noise') {
                this.container[params.noise_type] = new CellNoise();
            }
        }
        this.noise_maker = this.container[params.noise_type];
        this.noise_maker.set_variant_no(params.variant_no);
        this.noise_maker.set_canvas_width(this.width);
        this.noise_maker.set_canvas_height(this.height);
        // set up params
        if (params.noise_type == 'white_noise') {
            this.noise_maker.set_params({});
        } else if (params.noise_type == 'cell_noise') {
            let bg_color_arr = params.bg_color.match(/[0-9]+/g);
            let a_color_arr = params.a_color.match(/[0-9]+/g);
            let b_color_arr = params.b_color.match(/[0-9]+/g);
            this.noise_maker.set_params({
                points_shape: [params.points_shape_x, params.points_shape_y],
                threshold_range: [params.threshold_range[0]/100, params.threshold_range[1]/100],
                steps:params.steps,
                bg_color:new Color3(bg_color_arr[0]/255,bg_color_arr[1]/255,bg_color_arr[2]/255),
                a_color:new Color3(a_color_arr[0]/255,a_color_arr[1]/255,a_color_arr[2]/255),
                b_color:new Color3(b_color_arr[0]/255,b_color_arr[1]/255,b_color_arr[2]/255),
            });
        }
    }
    init_maker() {
        this.noise_maker.init();
    }
    generate(finish_callback) {
        var i = 0;
        var n = 0;
        var uv = [];
        var color = [];

        while (i < this.raw_arr_len) {
            uv = this.get_uv(n);
            color = this.noise_maker.make(uv);
            this.raw_arr[i] = color[0];
            i++;
            this.raw_arr[i] = color[1];
            i++;
            this.raw_arr[i] = color[2];
            i++;
            this.raw_arr[i] = color[3];
            i++;
            n++;
        }
        this.canvas.getContext("2d").putImageData(this.image_data, 0, 0);
        finish_callback();
    }
    get_uv(n) {
        var u = 0;
        var v = 0;
        u = n % this.width;
        v = Math.floor(n / this.width);
        return [u, v];
    }
    download_file(name) {
        var data_URL = this.canvas.toDataURL("image/png");
        download(data_URL, name + ".png", "image/png");
    }
}
export { Manager };