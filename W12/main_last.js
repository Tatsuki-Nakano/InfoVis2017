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
    var text = new function() {
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
    this.speed = 0.8;
    this.displayOutline = false;
    this.explode = function(){};
                                };    

    var gui = new dat.GUI();
    gui.add(text, 'message');
    gui.add(text, 'speed', -5, 5);
    gui.add(text, 'displayOutline');
    gui.add(text, 'explode');

    var isovalue = 128;
    var surfaces = Isosurfaces( volume, isovalue, screen );
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });

    screen.loop();
}
