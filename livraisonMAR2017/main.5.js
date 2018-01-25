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
			ModulesLoader.requireModules(["ParticleSystem.js"]);
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

	var particleSystem = new ParticleSystem.Engine_Class({
        textureFile : "assets/particles/particle.png",
		particlesCount : 10000,
		blendingMode : THREE.AdditiveBlending
	});

    var emitter = new ParticleSystem.ConeEmitter_Class({
        cone: {
            center: new THREE.Vector3(0,0,0),
        	height: new THREE.Vector3(0,0,1),
    		radius: 1,
    		flow: 1000
		},
    	particle: {
			speed: new MathExt.Interval_Class(5, 15),
			mass: new MathExt.Interval_Class(0.1, 0.3),
			size: new MathExt.Interval_Class(0.1, 1),
			lifeTime: new MathExt.Interval_Class(1, 7)
    	}
	});

    particleSystem.addEmitter(emitter);
	particleSystem.addModifier(new ParticleSystem.LifeTimeModifier_Class());
	particleSystem.addModifier(new ParticleSystem.ForceModifier_Weight_Class());
	particleSystem.addModifier(new ParticleSystem.PositionModifier_EulerItegration_Class());

	renderingEnvironment.addToScene(particleSystem.particleSystem);

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
		particleSystem.animate(clock.getDelta(), renderingEnvironment);
		// Rendering
		renderingEnvironment.renderer.render(renderingEnvironment.scene, renderingEnvironment.camera); 
	}

	render(); 
}
