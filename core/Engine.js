// Loading the Loader.js script. so i can load all other required scripts.
const script = document.createElement('script');
script.src = "../PhysicsEngine/core/Loader.js";
document.head.appendChild(script);


const Vector2d = "../PhysicsEngine/Vectors/Vector2.js";
const Vector3d = "../PhysicsEngine/Vectors/Vector3.js";


LoadScriptInOrder(Vector2d, Vector3d);