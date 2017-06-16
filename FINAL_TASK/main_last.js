function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
    
    screen.init( volume, {
	    width: window.innerWidth,
		height: window.innerHeight,
		enableAutoResize: false
		});
    
    var bounds = Bounds( volume );
    screen.scene.add( bounds );
    
    var stats;
    var container = document.getElementById( 'container' );
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );

    var control = function() {
	this.message = 'surface2';
	this.isovalue = 20;
	this.color = "#ff1e00";
	this.opacity = 0.2;
    };  

    var guiControls1 = new control();
    var guiControls2 = new control();
   
    guiControls1.message = 'surface1';
    guiControls1.isovalue = 200;
    guiControls1.color = "#29b98e";
    guiControls1.opacity = 0.5;

    var gui = new dat.GUI();


    gui.add(guiControls1, 'message');
    var isoControl1 = gui.add(guiControls1, 'isovalue', 0, 255).step(1);
    var colorControl1 = gui.addColor(guiControls1, 'color');
    var opacityControl1 = gui.add(guiControls1, 'opacity', 0, 1);

    gui.add(guiControls2, 'message');
    var isoControl2 = gui.add(guiControls2, 'isovalue', 0, 255).step(1);
    var colorControl2 = gui.addColor(guiControls2, 'color');
    var opacityControl2 = gui.add(guiControls2, 'opacity', 0, 1);    


    var iso1 = guiControls1.isovalue;
    var materialcolor1 = new THREE.Color().setHex( guiControls1.color.replace(/#/g, '0x') );
    var opacity1 = guiControls1.opacity;

    var iso2 = guiControls2.isovalue;
    var materialcolor2 = new THREE.Color().setHex( guiControls2.color.replace(/#/g, '0x') );
    var opacity2 = guiControls2.opacity;


    var surfaces1 = Isosurfaces( volume, iso1, screen, materialcolor1, opacity1 );
    screen.scene.add( surfaces1 );

    var surfaces2 = Isosurfaces( volume, iso2, screen, materialcolor2, opacity2 );
    screen.scene.add( surfaces2 );
    
    
    isoControl1.onChange(function() {
	    iso1 = guiControls1.isovalue;
	    update();
	}
	);
    colorControl1.onChange(function() {
	    materialcolor1 = new THREE.Color().setHex( guiControls1.color.replace(/#/g, '0x') );
	    update();
	}
	);
    opacityControl1.onChange(function() {
            opacity1 = guiControls1.opacity;
	    update();
	}
        );
    
    isoControl2.onChange(function() {
            iso2 = guiControls2.isovalue;
	    update();
	}
        );
    colorControl2.onChange(function() {
            materialcolor2 = new THREE.Color().setHex( guiControls2.color.replace(/#/g, '0x') );
	    update();
	}
        );
    opacityControl2.onChange(function() {
            opacity2 = guiControls2.opacity;
	    update();
	}
        );
    
    function update()
    {
	screen.scene.remove( surfaces1 );
	screen.scene.remove( surfaces2 );
	surfaces1 = Isosurfaces( volume, iso1, screen, materialcolor1, opacity1 );
	surfaces2 = Isosurfaces( volume, iso2, screen, materialcolor2, opacity2 );
	screen.scene.add( surfaces1 );
	screen.scene.add( surfaces2 );
    }

    document.addEventListener( 'mousemove', function() {
	    screen.light.position.copy( screen.camera.position );
	});
    
    window.addEventListener( 'resize', function() {
	    screen.resize( [ window.innerWidth, window.innerHeight ] );
	});
    
    
    //screen.loop();
    loop();
    function loop()
    {
	requestAnimationFrame( loop );
	screen.draw();
	stats.update();
    }

}
