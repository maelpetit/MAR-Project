/**
 *  ThreeJS test file using the ThreeRender class
 */

//Loads all dependencies
requirejs(['ModulesLoaderV2.js'], function()
		{
            // Level 0 includes
			ModulesLoader.requireModules(["threejs/three.min.js"]) ;
			ModulesLoader.requireModules([
				"myJS/ThreeRenderingEnv.js",
				"myJS/ThreeLightingEnv.js",
			    "myJS/ThreeLoadingEnv.js",
				"myJS/navZ.js",
				"FlyingVehicle.js"
			]) ;
			ModulesLoader.requireModules([
				"ParticleSystem.js",
				"Interpolators.js",
				"myJS/ParticleSystemFactory.js"
			]);
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

	var clock = new THREE.Clock(true);

	var object = new THREE.Object3D({
		position:{
			x: 0,
			y: 0,
			z: 0
		}
	});

	var particleSystems = [];

	// var ps1 = createParticleSystem1();
	// object.add(ps1.particleSystem);
	// particleSystems.push(ps1);

	function addParticleSystem(func){
		var ps = func({
            x:0,y:0,z:0
        });
        object.add(ps.particleSystem);
        particleSystems.push(ps);
	}

	// addParticleSystem(createParticleSystem1);
    // addParticleSystem(createTurboFireParticleSystem);
	// addParticleSystem(createJetFireParticleSystem);
	// addParticleSystem(createSmokeParticleSystem);
	addParticleSystem(createWaterFountainParticleSystem);
	renderingEnvironment.addToScene(object);

	/*var node = new THREE.Object3D({
		position : {
			x : 0,
			y : 0,
			z : 0
		}
	});
    Loader.load({
        filename : "assets/helico/helicoCorp.obj",
        node : node
    });
	renderingEnvironment.addToScene(node);*/

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
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0), -rotationIncrement) ;
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
		var deltaTime = clock.getDelta();
		particleSystems.forEach(function(ps){
			ps.animate(deltaTime, renderingEnvironment);
		});
		// object.rotation.z += 0.02;
		// Rendering
		renderingEnvironment.renderer.render(renderingEnvironment.scene, renderingEnvironment.camera); 
	}

	render(); 
}
