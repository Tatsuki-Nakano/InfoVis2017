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
    var control = function() {
                                        //this.model = 'foot';
                                        //this.steps = 256.0;
                                        //this.alphaCorrection = 1.0;
                                        //this.color1 = "#00FA58";
                                        //this.stepPos1 = 0.1;
                                        //this.color2 = "#CC6600";
                                        //this.stepPos2 = 0.7;
                                        //this.color3 = "#F2F200";
                                        //this.stepPos3 = 1.0;
    this.message = 'dat.gui';
    this.isovalue = 128;
    this.displayOutline = false;
    this.explode = function(){};
                                };    
    var iso = 1;
    var surfaces;
    guiControls = new control();
    var gui = new dat.GUI();
    gui.add(guiControls, 'message');
    var aaa = gui.add(guiControls, 'isovalue', 0, 255);
    gui.add(guiControls, 'displayOutline');
    gui.add(guiControls, 'explode');
    //var a;
    //aaa.onChange(setIsovalue(guiControls));
    //DebugPrint(a);
    //screen.scene.add(gui);
    //iso = guiControls.isovalue;
    //DebugPrint(iso+1);
    //var surfaces = Isosurfaces( volume, iso, screen );
    //screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });

    

 
    loop();
    function loop()
    {
	requestAnimationFrame(loop);
	update();                                                                                                                                                 
	screen.draw();
    }   
    function setIsovalue(object)
    {
	iso = Math.round(object.isovalue);
	DebugPrint(iso);
	surfaces = Isosurfaces( volume, iso, screen );
	screen.scene.add( surfaces );
    }
    function update()
    {
	aaa.onChange(setIsovalue(guiControls));

    }
}

function DebugPrint(str)
{
    var out = document.getElementById("debug");
    if (!out) return;
    out.value += str;
}

/*
function loop()
{
    requestAnimationFrame(loop);
    //update();
    screen.draw();
}
*/