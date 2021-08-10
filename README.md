![alt text](https://img.shields.io/static/v1?label=TypeScript&message=PhysicsEngine&color=red)
# Typescript physics engine

this is a physics engine made in typescript, it was first developed in JavaScript and later rewriten in typescript with a cleaner and better code base. 

**NOTE** this project is not a finished engine, and might never be it's used for my school projects and not for realworld applications!

## Includes
**GameObjects**
- Circle
- Cube
- Polygon
- Line
- sprite
- text

**Mathtools**
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

**Tweening**
- TweenPosition2d.ts

## Usage

### Simple bounce ball
```js
const scene = engine.createScene();

let ball = new Circle(new Vector2(innerWidth/2, innerHeight/2), 50, "red", false)
ball.velocity = new Vector2(10, 10);

ball.OnUpdate.AddListener(function() {
   ConfineInScreen.ConfineCircleInScreen(ball); 
});

scene.addGameObject(ball);
```

### Circle collision response

```js
const scene = engine.createScene();

let ball1 = new Circle(new Vector2(innerWidth/1.5, innerHeight/1.5), 100, "red", false)
let ball2 = new Circle(new Vector2(innerWidth*0.5, innerHeight*0.5), 100, "red", false)

ball1.velocity = new Vector2(-5, 5);
ball2.velocity = new Vector2(-5, -5);

scene.addGameObjects(ball1, ball2);

ball1.OnUpdate.AddListener(function() {
    ConfineInScreen.ConfineCircleInScreen(ball1)
    if (ball1.position.distanceTo(ball2.position) < ball1.radius + ball2.radius)
        Circle.resolveCollision(ball1, ball2);
});

ball2.OnUpdate.AddListener(function() {
    ConfineInScreen.ConfineCircleInScreen(ball2)
    if (ball1.position.distanceTo(ball2.position) < ball1.radius + ball2.radius)
        Circle.resolveCollision(ball1, ball2);
});
```

### Simplex noise example
```js
let noise = new SimplexNoise();
noise.noise(7,1,0) // outputs -0.17641740540869802
noise.noise(7,2,0) // outputs 0.4323454794146863
```


### Tween example
```js
const scene = engine.createScene();

const width = window.innerWidth;
const height = window.innerHeight;

let cube = new Cube(new Vector2(150, 150), 100, 100);

cube.rotation = Mathf.DegreeToRadian(45);

scene.addGameObjects(cube);

let tween = new TweenPosition2d(cube, new Vector2(window.innerWidth/2, 150), 0.001, EasingMethode.EaseInBounce)
TweenController.Instance().ActiveTweens.push(tween)
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
