import {Noise} from './noise.js';
import { Vector2 } from '../math/vector2.js';
import { Color3 } from '../math/color3.js';
import { Operation } from '../math/operation.js';

class CellNoise extends Noise {
    constructor() {
        super();
    }
    set_params(params){
        //points_shape = [num_points_width,num_points_height]
        //threshold_range = [min,max]
        this.points_shape = params.points_shape;
        this.threshold_range = params.threshold_range;
        this.steps = params.steps;
        this.bg_color = params.bg_color;
        this.a_color = params.a_color;
        this.b_color = params.b_color;
    }
    init(){
        this.points = [];
        //generate  feature points
        if (this.variant_no == 1 ) {
            var num_points = this.points_shape[0] * this.points_shape[1];
            for (let index = 0; index < num_points; index++) {
                let x = Math.random();
                let y = Math.random();
                this.points.push(new Vector2(x, y));
            }
        }else if(this.variant_no == 2){
            var num_points = this.points_shape[0] * this.points_shape[1];
            for (let index = 0; index < num_points; index++) {
                let point = new Vector2(Math.random(), Math.random());
                point.data = (new Color3()).rand();
                this.points.push(point);
            }
        }else if(this.variant_no ==  3){
            var num_points = this.points_shape[0] * this.points_shape[1];
            for (let index = 0; index < num_points; index++) {
                let x = Math.random();
                let y = Math.random();
                this.points.push(new Vector2(x, y));
            }
        }
    }
    make(uv_arr) {
        if (this.variant_no == 1) {
            return this.make1(uv_arr);
        }else if(this.variant_no == 2){
            return this.make2(uv_arr);
        }else if(this.variant_no == 3){
            return this.make3(uv_arr);
        }else{
            return uv_arr;
        }
    }
    //every region has its own gradient effect of same bg color
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
        var factor = Operation.percentage_with_clamp(min_distance, this.threshold_range[0], this.threshold_range[1]);
        return Operation.multiply_scalar(this.bg_color,factor).to_arr(255).concat([255]);
    }
    //every region has same color 
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
        return this.points[nearest_point_index].data.to_arr(255).concat([255]);
    }
    //every region has its own ripple effect based on a_color and b_color
    make3(uv_arr) {
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
        var factor = Operation.multi_steps_with_clamp(min_distance, this.threshold_range[0], this.threshold_range[1],this.steps);
        return Operation.lerp(this.a_color,this.b_color,factor).to_arr(255).concat([255]);
    }
}

export {CellNoise};