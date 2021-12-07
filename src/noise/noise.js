class Noise {
    constructor() {
        this.uv_max = [0, 0];
        this.variant_no = 1;
    }
    set_variant_no(variant_no){
        this.variant_no = variant_no;
    }
    set_canvas_width(width){
        this.uv_max[0] = width-1;
    }
    set_canvas_height(height){
        this.uv_max[1] = height-1;
    }
}
export {Noise};