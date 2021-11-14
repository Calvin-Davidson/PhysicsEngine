class CubeCollider2d {
    static CubeCollision(box1: Cube, box2: Cube) {
        return (box1.position.x < box2.position.x + box2.width && box1.position.x + box1.width > box2.position.x && box1.position.y < box2.position.y + box2.height && box1.position.y + box1.height > box2.position.y);
    }

    static CubeCircleCollision(Cube : Cube, Circle : Circle) {
        CircleCollider2d.CircleCubeCollision(Circle, Cube);
    }

    static CubePointCollision(cube : Cube, point : Vector2) {
        if (point.x < cube.position.x + cube.width && point.x > cube.position.x && point.y < cube.position.y + cube.height && point.y > cube.position.y) return true;
    }
}

