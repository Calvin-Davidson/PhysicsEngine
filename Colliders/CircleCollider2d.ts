class CircleCollider2d {
    static CircleCollision(CirclaA: Circle, CircleB: Circle) {
        return (CirclaA.position.distanceTo(CircleB.position) < CirclaA.radius + CircleB.radius);
    }

    static CircleCubeCollision(Circle: Circle, Cube: Cube) {
        let cubeCenterX = Cube.position.x + Cube.width / 2;
        let cubeCenterY = Cube.position.y + Cube.height / 2;

        let unrotatedCircleX = Math.cos(Cube.rotation) * (Circle.position.x - cubeCenterX) -
            Math.sin(Cube.rotation) * (Circle.position.y - cubeCenterY) + cubeCenterX;
        let unrotatedCircleY = Math.sin(Cube.rotation) * (Circle.position.x - cubeCenterX) +
            Math.cos(Cube.rotation) * (Circle.position.y - cubeCenterY) + cubeCenterY;

        let closestX, closestY;

        if (unrotatedCircleX < Cube.position.x)
            closestX = Cube.position.x;
        else if (unrotatedCircleX > Cube.position.x + Cube.width)
            closestX = Cube.position.x + Cube.width;
        else
            closestX = unrotatedCircleX;

        if (unrotatedCircleY < Cube.position.y)
            closestY = Cube.position.y;
        else if (unrotatedCircleY > Cube.position.y + Cube.height)
            closestY = Cube.position.y + Cube.height;
        else
            closestY = unrotatedCircleY;


        let distance = new Vector2(unrotatedCircleX, unrotatedCircleY).distanceTo(new Vector2(closestX, closestY));
        return (distance < Circle.radius)
    }

    static CirclePointCollision(Circle : Circle, position : Vector2) {
        return (Circle.position.distanceTo(position) < Circle.radius);
    }
}
