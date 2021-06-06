![alt text](https://img.shields.io/static/v1?label=TypeScript&message=PhysicsEngine&color=red)
# Typescript physics engine

this is a physics engine made in typescript, it was first developed in JavaScript and later rewriten in typescript with a cleaner and better code base. 

**NOTE** this project is not a finished engine, and might never be it's used for my school projects and not for realworld applications!

## Includes
**GameObjects**
- Circle
- Cube
- Polygon

**Mathtools**
- LinearFunction.ts
- Mathf

**Utilities**
- Colors.ts
- SpriteSheetRenderer.ts

**Vectors**
- Vector2.ts
- Vector3.ts

**Perlin**
- ClassicalNoise.ts
- SimplexNoise.ts

## Usage

### Simple bounce ball
```js
const engine = new Engine();

let ball = new Circle(new Vector2(innerWidth/2, innerHeight/2), 50, "red", false)


ball.velocity = new Vector2(10, 10);
function Update() {
    requestAnimationFrame(Update);
    ball.draw();
    ball.update();
}

Update();
```

### Circle collision response

```js
const engine = new Engine();

let ball1 = new Circle(new Vector2(innerWidth/1.5, innerHeight/1.5), 50, "red", false)
let ball2 = new Circle(new Vector2(innerWidth*0.5, innerHeight*0.5), 50, "red", false)

ball1.velocity = new Vector2(-5, 5);
ball2.velocity = new Vector2(-5, -5);

function Update() {
    requestAnimationFrame(Update);
    ball1.draw();
    ball1.update();

    ball2.draw();
    ball2.update();

    if (ball1.position.distanceTo(ball2.position) < ball1.radius + ball2.radius) 
        Circle.resolveCollision(ball1, ball2);
}

Update();
```

### Simplex noise example
```js
let noise = new SimplexNoise();
noise.noise(7,1,0) // outputs -0.17641740540869802
noise.noise(7,2,0) // outputs 0.4323454794146863
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
