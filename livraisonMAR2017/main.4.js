/**
 *  ThreeJS test file using the ThreeRender class
 */

//Loads all dependencies
requirejs(['ModulesLoaderV2.js'], function()
		{ 
			// Level 0 includes
			ModulesLoader.requireModules(["threejs/three.min.js"]) ;
			ModulesLoader.requireModules([ "myJS/ThreeRenderingEnv.js", 
			                              "myJS/ThreeLightingEnv.js", 
			                              "myJS/ThreeLoadingEnv.js", 
			                              "myJS/navZ.js",
			                              "FlyingVehicle.js"]) ;
			// Loads modules contained in includes and starts main function
			ModulesLoader.loadModules(start) ;
		}
) ;

function start()
{
	//	----------------------------------------------------------------------------
	//	MAR 2014 - TP Animation hélicoptère
	//	author(s) : Cozot, R. and Lamarche, F.
	//	---------------------------------------------------------------------------- 			
	//	global vars
	//	----------------------------------------------------------------------------
	//	keyPressed
	var currentlyPressedKeys = {};
	
	//	rendering env
	var renderingEnvironment =  new ThreeRenderingEnv();

	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',renderingEnvironment,5000);

	//	Loading env
	var Loader = new ThreeLoadingEnv();

	var helico_position = new THREE.Object3D();
	renderingEnvironment.addToScene(helico_position);
	helico_position.position.x = 0;
    helico_position.position.y = 0;
    helico_position.position.z = 0;

	var helico_rotationZ = new THREE.Object3D();
	helico_position.add(helico_rotationZ);

    var helico_left_turbine = Loader.load({filename:"assets/helico/turbine.obj", node: helico_rotationZ});
    helico_left_turbine.position.x = -8.5;
    helico_left_turbine.position.y = -3;
    helico_left_turbine.position.z = 4;

    var helico_left_axis = Loader.load({filename:"assets/helico/axe.obj", node: helico_rotationZ});
    helico_left_axis.position.x = -8.5;
    helico_left_axis.position.y = -2;
    helico_left_axis.position.z = 4;

    var helico_right_turbine = Loader.load({filename:"assets/helico/turbine.obj", node: helico_rotationZ});
    helico_right_turbine.position.x = 8.5;
    helico_right_turbine.position.y = -3;
    helico_right_turbine.position.z = 4;

    var helico_right_axis = Loader.load({filename:"assets/helico/axe.obj", node: helico_rotationZ});
    helico_right_axis.position.x = 8.5;
    helico_right_axis.position.y = -2;
    helico_right_axis.position.z = 4;

	var helico_central_turbine = Loader.load({filename:"assets/helico/turbine.obj", node: helico_rotationZ});
    helico_central_turbine.position.x = 0;
    helico_central_turbine.position.y = 0;
    helico_central_turbine.position.z = 4;
    helico_central_turbine.rotation.x = Math.PI / 2;

	var helico_central_axis = Loader.load({filename:"assets/helico/axe.obj", node: helico_rotationZ});
	helico_central_axis.position.x = 0;
    helico_central_axis.position.y = 0;
    helico_central_axis.position.z = 5;
    helico_central_axis.rotation.x = Math.PI / 2;

    var nbBlades = 3;

    for(var i = 0; i < nbBlades; i++){
    	var angle = (i + 1)*(2 * Math.PI / nbBlades);
    	var right_blade = Loader.load({filename:"assets/helico/pale.obj", node: helico_right_axis});
    	right_blade.position.y = 2;
    	right_blade.rotation.y = angle;
    	var left_blade = Loader.load({filename:"assets/helico/pale.obj", node: helico_left_axis});
        left_blade.position.y = 2;
        left_blade.rotation.y = angle;
    	var central_blade = Loader.load({filename:"assets/helico/pale.obj", node: helico_central_axis});
        central_blade.position.y = 2;
        central_blade.rotation.y = angle;
	}

	var helico_body = Loader.load({filename:"assets/helico/helicoCorp.obj", node: helico_rotationZ});

	// Camera setup
	renderingEnvironment.camera.position.x = 0 ;
	renderingEnvironment.camera.position.y = 0 ;
	renderingEnvironment.camera.position.z = 40 ;
	
	//	event listener
	//	---------------------------------------------------------------------------
	//	resize window
	window.addEventListener( 'resize', onWindowResize, false );
	//	keyboard callbacks 
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;					

	//	callback functions
	//	---------------------------------------------------------------------------
	function handleKeyDown(event) { currentlyPressedKeys[event.keyCode] = true;}
	function handleKeyUp(event) {currentlyPressedKeys[event.keyCode] = false;}

	function handleKeys() {
		if (currentlyPressedKeys[67]) // (C) debug
		{
			// debug scene
			renderingEnvironment.scene.traverse(function(o){
				console.log('object:'+o.name+'>'+o.id+'::'+o.type);
			});
		}				
		var rotationIncrement = 0.05 ;
		if (currentlyPressedKeys[68]) // (D) Right
		{
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(0.0,1.0,0.0), rotationIncrement) ;
		}
		if (currentlyPressedKeys[81]) // (Q) Left 
		{		
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(0.0,1.0,0.0), -rotationIncrement) ;
		}
		if (currentlyPressedKeys[90]) // (Z) Up
		{
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(1.0,0.0,0.0), rotationIncrement) ;
		}
		if (currentlyPressedKeys[83]) // (S) Down 
		{
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(1.0,0.0,0.0), -rotationIncrement) ;
		}
	}

	//	window resize
	function  onWindowResize() 
	{
		renderingEnvironment.onWindowResize(window.innerWidth,window.innerHeight);
	}

	function render() { 
		requestAnimationFrame( render );
		handleKeys();
        helico_central_axis.rotation.y += 0.1;
		// Rendering
		renderingEnvironment.renderer.render(renderingEnvironment.scene, renderingEnvironment.camera); 
	};

	render(); 
}
