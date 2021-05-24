class Vector2d {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	differenceVector(a, b) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
	}

	sumVector(a, b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
	}

	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
		this.z += vector.z;
	}

	scalMul(scal) {
		this.x *= scal;
		this.y *= scal;
		this.z *= scal;
	}

	dot(vector) {
		return (this.x * vector.x + this.y * vector.y + this.z + vector.z);
	}

	get magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	get angle() {
		return Math.atan2(this.y, this.x);
	}

	equals(vector) {
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
	}


	distanceTo(position2) {
		let pos1 = this.x - position2.x;
		let pos2 = this.y - position2.y;
		let pos3 = this.z - position2.z;

		return Math.sqrt(pos1 * pos1 + pos2 * pos2 + pos3 * pos3);
	}

	perpendicular(vector) {
		this.x = -vector.y;
		this.y = vector.x;
	}

	vectorSum(a, b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
	}

	VectorCenter(a, b) {
		this.x = (a.x + b.y) / 2;
		this.y = (a.y + b.y) / 2;
		this.z = (a.z + b.z) / 2;
	}
}