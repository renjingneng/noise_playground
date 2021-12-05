import { Vector2,Vector3 } from './math.js';
class Operation {
    static dot(vectora, vectorb) {
        var output;
        if (vectora instanceof  Vector2) {
            output = vectora.x * vectorb.x + vectora.y * vectorb.y;
        } else if (vectora instanceof  Vector3) {
            output = vectora.x * vectorb.x + vectora.y * vectorb.y + vectora.z * vectorb.z;
        }
        return output;
    }
    static distance_sq(vectora, vectorb) {
        var output;
        if (vectora instanceof  Vector2) {
            output = Math.pow((vectora.x - vectorb.x), 2) + Math.pow((vectora.y - vectorb.y), 2);
        } else if (vectora instanceof  Vector3) {
            output = Math.pow((vectora.x - vectorb.x), 2) + Math.pow((vectora.y - vectorb.y), 2) + Math.pow((vectora.z - vectorb.z), 2);
        }
        return output;
    }
    static distance(vectora, vectorb) {
        var output;
        output = Math.sqrt(this.distance_sq(vectora, vectorb));
        return output;
    }


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
    // https://en.wikipedia.org/wiki/Linear_interpolation
    static lerp(x, y, t) {
        return (1 - t) * x + t * y;
    }
    // Linear mapping from range [a1, a2] to range [b1, b2]
    static map_linear(x, a1, a2, b1, b2) {
        return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
    }
    static percentage_with_clamp(input, min, max) {
        input = this.clamp(input, min, max);
        return (input - min) / (max - min);
    }

}
export { Operation };