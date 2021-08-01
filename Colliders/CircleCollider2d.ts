class CircleCollider2d {
    static CircleCollision(CirclaA : Circle, CircleB : Circle) {
        return (CirclaA.position.distanceTo(CircleB.position) < CirclaA.radius + CircleB.radius);
    }

    static CircleCubeCollision(Circle : Circle, Cube : Cube) {

    }
}