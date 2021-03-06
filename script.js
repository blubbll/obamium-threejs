//©Blubbll

var THREE = window.THREE;

//create the scene
var scene = new THREE.Scene();

//create the camera   (field of view, aspect ratio, far clipping plane, )
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//create the renderer
var renderer = new THREE.WebGLRenderer();
//var renderer = new THREE.CanvasRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
//set the background colour of the renderer
renderer.setClearColor(0xffffff, 0);

//add the renderer to the stage, (renderer returns a <canvas> element)
document.body.appendChild(renderer.domElement);

/* ---------- Add a pyramid --------------*/

//add the geometry, this is an object that contains all the verticies and faces. pass in the size of the faces
var geometry = new THREE.CylinderGeometry(0, 7, 10, 3, 0);
//(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)

//create the texture by loading our image from file
var texture = THREE.ImageUtils.loadTexture("obama.png");

//set quality of the texture when it is viewed on a perspective (not essential)
texture.anisotropy = renderer.getMaxAnisotropy();

var material = new THREE.MeshBasicMaterial({ map: texture });

//create the Mesh using the geometry and material
var o = new THREE.Mesh(geometry, material);

//add the cube to the scene, defaults to coords 0,0,0 (x,y,z)
scene.add(o);

let l;
{
  function CustomSinCurve(scale) {
    THREE.Curve.call(this);

    this.scale = scale === undefined ? 1 : scale;
  }

  CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
  CustomSinCurve.prototype.constructor = CustomSinCurve;

  CustomSinCurve.prototype.getPoint = function(t) {
    var tx = t * 3;
    var ty = Math.sin(2 * Math.PI * t);
    var tz = 1;

    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  };

  var path = new CustomSinCurve(10);
  var geometry = new THREE.TubeGeometry(path, 20, 2, 8, false);
  //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  l = mesh;
}

//move the camera back a bit so it is not sitting on the cube, if you see a white canvas try adjusting the camera pos
camera.position.z = 20;

/* ---- Render Loop ---- */
var render = function() {
  requestAnimationFrame(render);
  o.rotation.x += 0.0;
  o.rotation.y += 0.05;

  l.rotation.x += 0.002;
  l.rotation.y += 0.025;

  renderer.render(scene, camera);
};
//start the render loop
render();
