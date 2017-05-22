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

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ -1,  1, 0 ], // 0
        [ -1, -1, 0 ], // 1
        [  1, -1, 0 ], // 2
	[  1,  1, 0 ]  // 3
    ];

    var faces = [
        [ 0, 1, 2 ], // f0
	[ 2, 3, 0 ]  // f1
    ];

    var scalars = [
        0.1, // S0
        0.2, // S1
        0.8, // S2
	0.5  // S3
    ];

    // Create color map
    var cmap = [];
/*
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
    }
*/

    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = 1.0;
        var G = Math.max( 0.5 * Math.sin( ( S + 0.5 ) * Math.PI ) + 0.5, 0.0 );
        var B = Math.max( 0.5 * Math.sin( ( S + 0.5 ) * Math.PI ) + 0.5, 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
    }
/*
    for ( var i = 0; i < 256; i++ )
	{
	    var S = i / 255.0; // [0,1]                                                                                                 
	    var R = 1.0;
	    var G = Math.max( -Math.sin( S * 0.5 * Math.PI ) + 1.0, 0.0 );
	    var B = Math.max( -Math.sin( S * 0.5 * Math.PI ) + 1.0, 0.0 );
	    var color = new THREE.Color( R, G, B );
	    cmap.push( [ S, '0x' + color.getHexString() ] );
	}
*/
    // Draw color map
    var lut = new THREE.Lut( 'rainbow', cmap.length );
    lut.addColorMap( 'mycolormap', cmap );
    lut.changeColorMap( 'mycolormap' );
    scene.add( lut.setLegendOn( {
        'layout':'horizontal',
        'position': { 'x': 0.6, 'y': -1.1, 'z': 2 },
        'dimensions': { 'width': 0.15, 'height': 1.2 }
    } ) );

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }

    // Assign colors for each vertex
    material.vertexColors = THREE.VertexColors;
    var x0 = 0.1;
    var x1 = 0.8;
    //var S0 = 0.0;                                                                                                             
    //var S1 = 255.0;                                                                                                           

    for ( var j = 0; j < nfaces; j++ )
	{
	    var id = faces[j];
	    var S = [];
	    for ( var k = 0; k < 3; k++ )
		{ S.push( scalars[ id[k] ] ); }

	    var c = [];

	    for ( var k = 0; k < 3; k++ )
		{
		    var xi = S[k];
		    var t = ( xi - x0 ) / ( x1 - x0 );
		    //var Si = ( 1.0 - t ) * S0 + t * S1;                                                                               
		    //var Ri = Math.max( Math.cos( ( t - 1.0 ) * Math.PI ), 0.0 );
		    var Ri = 1.0;
		    //var Gi = Math.max( Math.cos( ( t - 0.5 ) * Math.PI ), 0.0 );
		    var Gi = Math.max( 0.5 * Math.sin( ( t + 0.5 ) * Math.PI ) + 0.5, 0.0 );
		    //var Bi = Math.max( Math.cos( t * Math.PI ), 0.0 );
		    var Bi = Math.max( 0.5 * Math.sin( ( t + 0.5 ) * Math.PI ) + 0.5, 0.0 );
		    var colori = new THREE.Color( Ri, Gi, Bi );
		    c.push( '0x' + colori.getHexString() );
		}

	    var C0 = new THREE.Color().setHex( c[ 0 ] );
	    var C1 = new THREE.Color().setHex( c[ 1 ] );
	    var C2 = new THREE.Color().setHex( c[ 2 ] );
	    geometry.faces[j].vertexColors.push( C0 );
	    geometry.faces[j].vertexColors.push( C1 );
	    geometry.faces[j].vertexColors.push( C2 );
	}

    var triangle = new THREE.Mesh( geometry, material );
    scene.add( triangle );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        renderer.render( scene, camera );
    }
}
