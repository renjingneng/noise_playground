import { download } from '../res/download.js';
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
    }
    set_maker(noise_maker) {
        this.noise_maker = noise_maker;
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
        document.getElementById("canvas").getContext("2d").putImageData(this.image_data, 0, 0);
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