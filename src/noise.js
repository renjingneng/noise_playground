import { Vector2 } from './math.js';
import { Color } from './color.js';
import { Operation } from './operation.js';

class Noise {
    constructor(canvas_info) {
        this.uv_max = [canvas_info.width - 1, canvas_info.height - 1];
        this.make_type = canvas_info.make_type;
    }
}

class WhiteNoise extends Noise {
    constructor(canvas_info) {
        super(canvas_info);
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
class ValueNoise extends Noise {
    constructor(canvas_info) {
        super(canvas_info);
    }
    make(uv_arr) {

    }
}
class WorleyNoise extends Noise {
    //points_shape = [num_points_width,num_points_height]
    //threshold_range = [min,max]
    constructor(canvas_info, points_shape, threshold_range) {
        super(canvas_info);
        this.points_shape = points_shape;
        this.threshold_range = threshold_range;
        this.points = [];

        //generate  feature points
        if (this.make_type == 1) {
            var num_points = this.points_shape[0] * this.points_shape[1];
            for (let index = 0; index < num_points; index++) {
                let x = Math.random();
                let y = Math.random();
                this.points.push(new Vector2(x, y));
            }
        }else if(this.make_type == 2){
            var num_points = this.points_shape[0] * this.points_shape[1];
            for (let index = 0; index < num_points; index++) {
                let point = new Vector2(Math.random(), Math.random());
                point.data = (new Color()).rand();
                this.points.push(point);
            }
        }
    }
    make(uv_arr) {
        if (this.make_type == 1) {
            return this.make1(uv_arr);
        }else if(this.make_type == 2){
            return this.make2(uv_arr);
        }
    }
    make1(uv_arr) {
        //calculate min distance 
        var uv_vec = new Vector2(uv_arr[0] / this.uv_max[0], uv_arr[1] / this.uv_max[1]);
        var min_distance = Infinity;
        
        for (let index = 0; index < this.points.length; index++) {
            let distance = Operation.distance(this.points[index], uv_vec);
            if (distance < min_distance) {
                min_distance = distance;
            }
        }
        //return color 
        var color = [];
        var factor = Operation.percentage_with_clamp(min_distance, this.threshold_range[0], this.threshold_range[1]);
        
        color[0] = factor * 255;
        color[1] = factor * 255;
        color[2] = factor * 255;
        color[3] = 255;
        return color;
    }
    make2(uv_arr) {
        //calculate min distance 
        var uv_vec = new Vector2(uv_arr[0] / this.uv_max[0], uv_arr[1] / this.uv_max[1]);
        var nearest_point_index = null;
        var min_distance = Infinity;
        
        for (let index = 0; index < this.points.length; index++) {
            let distance = Operation.distance(this.points[index], uv_vec);
            
            if (distance < min_distance) {
                min_distance = distance;
                nearest_point_index = index;
            }
        }
        //return color 
        return this.points[nearest_point_index].data.to_arr();
    }
}
export { WhiteNoise, WorleyNoise };