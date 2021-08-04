const scale = (Math.pow(10,-4.2));

const mercury = new Planet(2439,    new THREE.Vector3( -1,   0, -2)   , (57.9*Math.pow(10,6)),   {color: 0xF78E00},'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/planet_textures/mercurymap.jpg');
const venus =   new Planet(6052,    new THREE.Vector3( -1.5, 0,  3)   , (108.2*Math.pow(10,6)),  {color: 0xE29D00},'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/planet_textures/venusmap.jpg');
const earth =   new Planet(6378,    new THREE.Vector3( -1,   0, -4)   , (149.6*Math.pow(10,6)),  {color: 0x0076FF},'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/planet_textures/earthmap1k.jpg');
const mars =    new Planet(3396,    new THREE.Vector3( -4,   0,  4)   , (227.9*Math.pow(10,6)),  {color: 0xFF1925},'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/planet_textures/marsmap1k.jpg');
const jupiter = new Planet(71492,   new THREE.Vector3( 5.5,  0, -4.5) , (778.6*Math.pow(10,6)),  {color: 0xA000FF},'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/planet_textures/jupitermap.jpg');
const saturn =  new Planet(60268,   new THREE.Vector3( 5,    0, -6.5) , (1433.5*Math.pow(10,6)), {color: 0x957500},'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/planet_textures/saturnmap.jpg');
const uranus =  new Planet(25559,   new THREE.Vector3( 7,    0,  6.5) , (2872.5*Math.pow(10,6)), {color: 0x8247FF},'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/planet_textures/uranusmap.jpg');
const neptune = new Planet(24764,   new THREE.Vector3( 10.5, 0, -1.5) , (4495.1*Math.pow(10,6)), {color: 0x826FFF},'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/planet_textures/neptunemap.jpg');
const pluto =   new Planet(1815,    new THREE.Vector3( 5,    0, -10)  , (5906.4*Math.pow(10,6)), {color: 0xAAAAAA},'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/planet_textures/plutomap1k.jpg');
const moon =   new Planet(1815,    new THREE.Vector3( -3,    0, 50)  , (150000), {color: 0xAAAAAA},'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/planet_textures/plutomap1k.jpg');                                                                                                             


//create scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 10000000 );


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth-100, window.innerHeight- 100 );
document.body.appendChild( renderer.domElement );

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/skybox/purple-skybox_right1.png',
    'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/skybox/purple-skybox_left2.png',
    'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/skybox/purple-skybox_top3.png',
    'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/skybox/purple-skybox_bottom4.png',
    'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/skybox/purple-skybox_front5.png',
    'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/skybox/purple-skybox_back6.png'
]);
scene.background = texture;


// //add sun
var sun_geo = new THREE.SphereGeometry(696340*scale,100,100);
const sun_texture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/arthurmois/our-cosmos/master/images/sunmap.jpg' );
var sun_material = new THREE.MeshBasicMaterial( { map: sun_texture } );
var sun = new THREE.Mesh( sun_geo, sun_material );
scene.add( sun );


//add planets
sun.add( mercury.planet );
sun.add( venus.planet );

sun.add( earth.planet );
earth.planet.add(moon.planet);

sun.add( mars.planet );
sun.add( jupiter.planet );
sun.add( saturn.planet );
sun.add( uranus.planet );
sun.add( neptune.planet );
sun.add( pluto.planet );


// //add orbit paths
// drawCircle( mercury.dist );
// drawCircle( venus.dist );
// drawCircle( earth.dist );
// drawCircle( mars.dist );
// drawCircle( jupiter.dist );
// drawCircle( saturn.dist );
// drawCircle( uranus.dist );
// drawCircle( neptune.dist );
// drawCircle( pluto.dist +0.69 );

const controls = new OrbitControls( camera, renderer.domElement );
viewPlanet(earth,3,0.5);

function viewPlanet(planet, offset, ht)
{
    var camera_dir = planet.dir.clone();
    camera_dir.normalize();
    camera.position.set(planet.position.x+(10*camera_dir.x*offset),planet.position.y+(10*camera_dir.y)+ht,planet.position.z+(10*camera_dir.z*offset));
    //camera.position.set(planet.position.x+10,planet.position.y+10,planet.position.z+10);

    controls.autoRotate = true;
    controls.autoRotateSpeed = -0.085;

    controls.target = new THREE.Vector3(planet.position.x,planet.position.y,planet.position.z);
    controls.update();
}

function animate() {

    controls.update();

	requestAnimationFrame( animate );
	renderer.render(scene, camera);
}
animate();

function drawCircle(radius){
    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial( { color: 0x00ffff } );

    const points = [];
      
    // 360 full circle will be drawn clockwise
    for(let i = 0; i <= 360; i+=0.25)
    
    {
        points.push(new THREE.Vector3(Math.sin(i*(Math.PI/180))*radius, 0, Math.cos(i*(Math.PI/180))*radius));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );

    scene.add( line );
}