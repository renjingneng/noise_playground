class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.data = null;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    length_sq() {
        return this.x * this.x + this.y * this.y;

    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);

    }
    manhattan_length() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
        var len = this.length();
        this.x = this.x / len;
        this.y = this.y / len;
        return this;
    }
    multiply_scalar(scalar){
        this.x *= scalar;
		this.y *= scalar;
        return this; 
    }
}
class Vector3 {
    constructor(x = 0, y = 0,z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.data = null;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }
    length_sq() {
        return this.x * this.x + this.y * this.y+ this.z * this.z;

    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y+ this.z * this.z);

    }
    manhattan_length() {
        return Math.abs(this.x) + Math.abs(this.y)+ Math.abs(this.z);

    }
    normalize() {
        var len = this.length();
        this.x = this.x / len;
        this.y = this.y / len;
        this.z = this.z / len;
        return this;
    }
    multiply_scalar(scalar){
        this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
        return this; 
    }
}
export { Vector2,Vector3 };