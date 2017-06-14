function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
	[-1, 1, 0],//v0
	[-1,-1, 0],//v1
	[ 1,-1, 0],//v2
	[ 1, 1, 0],//v3
	[-1,-1, 1],//v4
	[-1,-1, 1],//v5
	[ 1,-1, 1],//v6
	[ 1, 1, 1],//v7
    ];

    var faces = [
	[0,1,2],//f0: v0-v1-v2
	[0,1,2],//f1: v0-v1-v
	[0,1,2],//f2: v0-v1-v
	[0,1,2],//f3: v0-v1-v
	[0,1,2],//f4: v0-v1-v
	[0,1,2],//f5: v0-v1-v
	[0,1,2],//f6: v0-v1-v
	[0,1,2],//f7: v0-v1-v
	[0,1,2],//f8: v0-v1-v
	[0,1,2],//f9: v0-v1-v
	[0,1,2],//f10:v0-v1-v
	[0,1,2] //f11:v0-v1-v
    ];

    var v = [];
    
    for(i=0;i<8;i++)
	v.push( new THREE.Vector3().fromArray( vertices[i] ));

    var f = [];

    for(i=0;i<12;i++){
	var id = faces[i];
	f.push( new THREE.Face3( id[0], id[1], id[2] ));
    }

    var geometry = [];
    for(i=0;i<12;i++){
	geometry.push( new THREE.Geometry() );
    }
    
    geometry[0].vertices.push( v[0] );
    geometry[0].vertices.push( v[1] );
    geometry[0].vertices.push( v[2] );
    geometry[0].faces.push( f[0] );
    
    geometry[1].vertices.push( v[0] );
    geometry[1].vertices.push( v[2] );
    geometry[1].vertices.push( v[3] );
    geometry[1].faces.push( f[1] );

    geometry[2].vertices.push( v[0] );
    geometry[2].vertices.push( v[2] );
    geometry[2].vertices.push( v[3] );
    geometry[2].faces.push( f[2] );

    var material = new THREE.MeshBasicMaterial();
    //var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    //var cube = new THREE.Mesh( geometry, material );
    //scene.add( cube );
    material.vertexColors = THREE.FaceColors;
    for(i=0;i<2;i++)
	geometry[i].faces[0].color = new THREE.Color( 1, 0, 0 );

    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.VertexColors;

    for(i=0;i<2;i++){
	geometry[i].faces[0].vertexColors.push(new THREE.Color(1,0,0));
	geometry[i].faces[0].vertexColors.push(new THREE.Color(0,1,0));
	geometry[i].faces[0].vertexColors.push(new THREE.Color(0,0,1));
    }
    var cube = [];
    for(i=0;i<2;i++){
	cube.push( new THREE.Mesh( geometry[i], material ));
	scene.add( cube[i] );
    }
    
    var light = new THREE.PointLight( 0xffffff );
    light.position.set(1,1,1);
    scene.add(light);
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube[0].rotation.x += 0.001;
        cube[0].rotation.y += 0.001;
	cube[1].rotation.x += 0.001;
	cube[1].rotation.y += 0.001;
        renderer.render( scene, camera );
    }
}
