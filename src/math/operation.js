import { Vector3 } from './vector3.js';
import { Vector2 } from './vector2.js';
import { Color3 } from './color3.js';
class Operation {
    /*******number operation***********/
    // http://en.wikipedia.org/wiki/Smoothstep
    static smoothstep(x, min, max) {
        if (x <= min) return 0;
        if (x >= max) return 1;
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x);
    }
    // http://en.wikipedia.org/wiki/Smoothstep
    static smootherstep(x, min, max) {
        if (x <= min) return 0;
        if (x >= max) return 1;
        x = (x - min) / (max - min);
        return x * x * x * (x * (x * 6 - 15) + 10);
    }
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    // Linear mapping from range [a1, a2] to range [b1, b2]
    static map_linear(x, a1, a2, b1, b2) {
        return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
    }
    static percentage_with_clamp(input, min, max) {
        input = this.clamp(input, min, max);
        return (input - min) / (max - min);
    }
    static multi_steps_with_clamp(input, min, max, steps) {
        input = this.clamp(input, min, max);
        let step_range = (max - min) / steps;
        let step_in = Math.floor((input - min) / step_range);
        return step_in / steps;
    }
    /*******number operation***********/
    /*******vector operation***********/
    static dot(vectora, vectorb) {
        var output;
        if (vectora instanceof Vector2) {
            output = vectora.x * vectorb.x + vectora.y * vectorb.y;
        } else if (vectora instanceof Vector3) {
            output = vectora.x * vectorb.x + vectora.y * vectorb.y + vectora.z * vectorb.z;
        }
        return output;
    }
    static distance_sq(vectora, vectorb) {
        var output;
        if (vectora instanceof Vector2) {
            output = Math.pow((vectora.x - vectorb.x), 2) + Math.pow((vectora.y - vectorb.y), 2);
        } else if (vectora instanceof Vector3) {
            output = Math.pow((vectora.x - vectorb.x), 2) + Math.pow((vectora.y - vectorb.y), 2) + Math.pow((vectora.z - vectorb.z), 2);
        }
        return output;
    }
    static distance(vectora, vectorb) {
        var output;
        output = Math.sqrt(this.distance_sq(vectora, vectorb));
        return output;
    }
    /*******vector operation***********/
    /*******tensor operation***********/
    static multiply_scalar(tensor, scalar) {
        var output;
        if (tensor.constructor === Vector2) {
            output = (new Vector2()).copy(tensor).multiply_scalar(scalar);
        } else if (tensor.constructor === Vector3) {
            output = (new Vector3()).copy(tensor).multiply_scalar(scalar);
        } else if (tensor.constructor === Color3) {
            output = (new Color3()).copy(tensor).multiply_scalar(scalar);
        } else {
            output = tensor * scalar;
        }
        return output;
    }
    // https://en.wikipedia.org/wiki/Linear_interpolation
    static lerp(tensora, tensorb, t) {
        var output;
        if (tensora.constructor === Vector2) {
            output = new Vector2(this.lerp(tensora.x, tensorb, x, t), this.lerp(tensora.y, tensorb.y, t));
        } else if (tensora.constructor === Vector3) {
            output = new Vector3(this.lerp(tensora.x, tensorb.x, t), this.lerp(tensora.y, tensorb.y, t), this.lerp(tensora.z, tensorb.z, t));
        } else if (tensora.constructor === Color3) {
            output = new Color3(this.lerp(tensora.r, tensorb.r, t), this.lerp(tensora.g, tensorb.g, t), this.lerp(tensora.b, tensorb.b, t));
        } else {
            //tensora and tensorb are float
            output = (1 - t) * tensora + t * tensorb;
        }
        return output;
    }
    /*******tensor operation***********/

}
export { Operation };