/**
 *  ThreeJS test file using the ThreeRender class
 */

//Loads all dependencies
requirejs(['ModulesLoaderV2.js'], function()
		{ 
			// Level 0 includes
			ModulesLoader.requireModules(['threejs/three.min.js']) ;
			ModulesLoader.requireModules([ 'myJS/ThreeRenderingEnv.js',
			                              'myJS/ThreeLightingEnv.js',
			                              'myJS/ThreeLoadingEnv.js',
			                              'myJS/navZ.js',
			                              'FlyingVehicle.js']) ;
			// Loads modules contained in includes and starts main function
			ModulesLoader.loadModules(start) ;
		}
) ;

function start()
{
	//	----------------------------------------------------------------------------
	//	MAR 2014 - nav test
	//	author(s) : Cozot, R. and Lamarche, F.
	//	date : 11/16/2014
	//	last : 11/25/2014
	//	---------------------------------------------------------------------------- 			
	//	global vars
	//	----------------------------------------------------------------------------
	//	keyPressed
	var currentlyPressedKeys = {};
	
	// car Position
	var CARx = -220; 
	var CARy = 100 ;
	var CARz = 0 ;
	var CARtheta = 0 ; 

	// Creates the vehicle (handled by physics)
	var vehicle = new FlyingVehicle(
			{
				position: new THREE.Vector3(CARx, CARy, CARz),
				zAngle : CARtheta+Math.PI/2.0,
			}
			) ;
	const cameraZ = 200;

	var cameraSet = [] ;
	var camera1 = {x: -260, y:240};
	var camera3 = {x:100,y:0};
	var camera5 = {x:300,y:-100};
	var camera8 = {x:-120,y:-60} ;
	cameraSet[0] = cameraSet[1] = cameraSet[2] = cameraSet[3] = cameraSet[4] =  camera1 ;
	cameraSet[5] = 	cameraSet[6] = camera3 ;
	cameraSet[7] = 	cameraSet[8] = camera3 ;
	cameraSet[9] = 	cameraSet[10] = cameraSet[11] = camera5;
	cameraSet[12] = cameraSet[13] = camera5 ;
	cameraSet[14] = cameraSet[15] = camera5 ;
	cameraSet[16] = cameraSet[17] = cameraSet[18] = cameraSet[19] = cameraSet[20] = camera8 ;
	cameraSet[21] = cameraSet[22] = cameraSet[23] = cameraSet[24] = cameraSet[25] = camera8 ;
	cameraSet[26] = cameraSet[27] = cameraSet[28] = camera8 ;
	cameraSet[29] = camera1;
 	
	//	rendering env
	var renderingEnvironment =  new ThreeRenderingEnv();

	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',renderingEnvironment,5000);

	//	Loading env
	var Loader = new ThreeLoadingEnv();

	//	Meshes
	Loader.loadMesh('assets','border_Zup_02','obj',	renderingEnvironment.scene,'border',	-340,-340,0,'front');
	Loader.loadMesh('assets','ground_Zup_03','obj',	renderingEnvironment.scene,'ground',	-340,-340,0,'front');
	Loader.loadMesh('assets','circuit_Zup_02','obj',renderingEnvironment.scene,'circuit',	-340,-340,0,'front');
	//Loader.loadMesh('assets','tree_Zup_02','obj',	renderingEnvironment.scene,'trees',	-340,-340,0,'double');
	Loader.loadMesh('assets','arrivee_Zup_01','obj',	renderingEnvironment.scene,'decors',	-340,-340,0,'front');
		
	//	Car
	// car Translation
	var carPosition = new THREE.Object3D(); 
	carPosition.name = 'car0'; 
	renderingEnvironment.addToScene(carPosition); 
	// initial POS
	carPosition.position.x = CARx;
	carPosition.position.y = CARy;
	carPosition.position.z = CARz;
	// car Rotation floor slope follow
	var carFloorSlope = new THREE.Object3D(); 
	carFloorSlope.name = 'car1';
	carPosition.add(carFloorSlope);
	// car vertical rotation
	var carRotationZ = new THREE.Object3D(); 
	carRotationZ.name = 'car2';
	carFloorSlope.add(carRotationZ);
	carRotationZ.rotation.z = CARtheta ;
	// the car itself 
	// simple method to load an object
	var carGeometry = Loader.load({filename: 'assets/car_Zup_01.obj', node: carRotationZ, name: 'car3'}) ;
	carGeometry.position.z= +0.25 ;

	var cameraPivot = new THREE.Object3D();
	carGeometry.add(cameraPivot);
		
	//	Skybox
	Loader.loadSkyBox('assets/maps',['px','nx','py','ny','pz','nz'],'jpg', renderingEnvironment.scene, 'sky',4000);

	//	Planes Set for Navigation 
	// 	z up 
	var NAV = new navPlaneSet(
					new navPlane('p01',	-260, -180,	 -80, 120,	+0,+0,'px')); 		// 01	
	NAV.addPlane(	new navPlane('p02', -260, -180,	 120, 200,	+0,+20,'py')); 		// 02		
	NAV.addPlane(	new navPlane('p03', -260, -240,	 200, 240,	+20,+20,'px')); 	// 03		
	NAV.addPlane(	new navPlane('p04', -240, -160,  200, 260,	+20,+20,'px')); 	// 04		
	NAV.addPlane(	new navPlane('p05', -160,  -80,  200, 260,	+20,+40,'px')); 	// 05		
	NAV.addPlane(	new navPlane('p06',  -80, -20,   200, 260,	+40,+60,'px')); 	// 06		
	NAV.addPlane(	new navPlane('p07',  -20,  +40,  140, 260,	+60,+60,'px')); 	// 07		
	NAV.addPlane(	new navPlane('p08',    0,  +80,  100, 140,	+60,+60,'px')); 	// 08		
	NAV.addPlane(	new navPlane('p09',   20, +100,   60, 100,	+60,+60,'px')); 	// 09		
	NAV.addPlane(	new navPlane('p10',   40, +100,   40,  60,	+60,+60,'px')); 	// 10		
	NAV.addPlane(	new navPlane('p11',  100,  180,   40, 100,	+40,+60,'nx')); 	// 11		
	NAV.addPlane(	new navPlane('p12',  180,  240,   40,  80,	+40,+40,'px')); 	// 12		
	NAV.addPlane(	new navPlane('p13',  180,  240,    0,  40,	+20,+40,'py')); 	// 13 		
	NAV.addPlane(	new navPlane('p14',  200,  260,  -80,   0,	+0,+20,'py')); 		// 14		
	NAV.addPlane(	new navPlane('p15',  180,  240, -160, -80,	+0,+40,'ny')); 		// 15		
	NAV.addPlane(	new navPlane('p16',  160,  220, -220,-160,	+40,+40,'px')); 	// 16	
	NAV.addPlane(	new navPlane('p17',   80,  160, -240,-180,	+40,+40,'px')); 	// 17	
	NAV.addPlane(	new navPlane('p18',   20,   80, -220,-180,	+40,+40,'px')); 	// 18	
	NAV.addPlane(	new navPlane('p19',   20,   80, -180,-140,	+40,+60,'py')); 	// 19	
	NAV.addPlane(	new navPlane('p20',   20,   80, -140,-100,	+60,+80,'py')); 	// 20	
	NAV.addPlane(	new navPlane('p21',   20,   60, -100, -40,	+80,+80,'px')); 	// 21		
	NAV.addPlane(	new navPlane('p22',  -80,   20, -100, -40,	+80,+80,'px')); 	// 22		
	NAV.addPlane(	new navPlane('p23', -140,  -80, -100, -40,	+80,+80,'px')); 	// 23		
	NAV.addPlane(	new navPlane('p24', -140,  -80, -140,-100,	+60,+80,'py')); 	// 24		
	NAV.addPlane(	new navPlane('p25', -140,  -80, -200,-140,	+40,+60,'py')); 	// 25		
	NAV.addPlane(	new navPlane('p26', -100,  -80, -240,-200,	+40,+40,'px')); 	// 26		
	NAV.addPlane(	new navPlane('p27', -220, -100, -260,-200,	+40,+40,'px')); 	// 27	
	NAV.addPlane(	new navPlane('p28', -240, -220, -240,-200,	+40,+40,'px')); 	// 28	
	NAV.addPlane(	new navPlane('p29', -240, -180, -200,-140,	+20,+40,'ny')); 	// 29	
	NAV.addPlane(	new navPlane('p30', -240, -180, -140, -80,	+0,+20,'ny')); 		// 30			
	NAV.setPos(CARx,CARy,CARz);

	var nbCheckpoints = 3; //{1, 12, 23}
	var checkpoints = [];
	var nbLaps = 0;
	function resetCheckpoints(){
		for(var i = 0; i < nbCheckpoints; i++){
			checkpoints[i] = false;
		}
	}

	var clock = new THREE.Clock(false);
    var lastLapTime = 0;

	resetCheckpoints();

	var cinematic = false;
	setEmbeddedCamera();
	NAV.initActive();
	// DEBUG
	//NAV.debug();
	//var navMesh = NAV.toMesh();
	//renderingEnvironment.addToScene(navMesh);
	//	event listener
	//	---------------------------------------------------------------------------
	//	resize window
	window.addEventListener( 'resize', onWindowResize, false );
	//	keyboard callbacks 
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	var speedDiv = document.getElementById('speed');
	var wrongDirectionDiv = document.getElementById('wrong-direction');
	var clockDiv = document.getElementById('clock');
	var timeBoardDiv = document.getElementById('time-board');
	var timeBoardString = '';
	var prevPlane = 0;
	//	callback functions
	//	---------------------------------------------------------------------------
	function handleKeyDown(event) {
		if(event.keyCode == 80)
		{
		    switchCamera();
		}else{
			currentlyPressedKeys[event.keyCode] = true;
		}
	}
	function handleKeyUp(event) {currentlyPressedKeys[event.keyCode] = false;}

	function handleKeys() {
		if (currentlyPressedKeys[67]) // (C) debug
		{
			// debug scene
			renderingEnvironment.scene.traverse(function(o){
				console.log('object:'+o.name+'>'+o.id+'::'+o.type);
			});
		}				
		if (currentlyPressedKeys[68]) // (D) Right
		{
			vehicle.turnRight(1000) ;
		}
		if (currentlyPressedKeys[81]) // (Q) Left 
		{		
			vehicle.turnLeft(1000) ;
		}
		if (currentlyPressedKeys[90]) // (Z) Up
		{
			vehicle.goFront(1200, 1200) ;
		}
		if (currentlyPressedKeys[83]) // (S) Down 
		{
			vehicle.brake(100) ;
		}
	}

	function switchCamera(){
        if(cinematic){
            setEmbeddedCamera();
        }else{
            cameraPivot.remove(renderingEnvironment.camera) ;
        }
        cinematic = !cinematic;
    }

	function setEmbeddedCamera(){
        cameraPivot.add(renderingEnvironment.camera) ;
		//renderingEnvironment.camera.up = new THREE.Vector3(0,0,1);
		renderingEnvironment.camera.position.x = 0.0 ;
		renderingEnvironment.camera.position.z = 10.0 ;
		renderingEnvironment.camera.position.y = -25.0 ;
		renderingEnvironment.camera.rotation.y = 0 ;
		renderingEnvironment.camera.rotation.z = 0 ;
		renderingEnvironment.camera.rotation.x = 85.0*3.14159/180.0 ;
	}

	//	window resize
	function  onWindowResize() 
	{
		renderingEnvironment.onWindowResize(window.innerWidth,window.innerHeight);
	}

	function render() {
		requestAnimationFrame( render );
		handleKeys();
		// Vehicle stabilization 
		vehicle.goUp(vehicle.weight()/4.0, vehicle.weight()/4.0, vehicle.weight()/4.0, vehicle.weight()/4.0) ;
		vehicle.stopAngularSpeedsXY() ;
		vehicle.stabilizeSkid(50) ; 
		vehicle.stabilizeTurn(1000) ;
		var oldPosition = vehicle.position.clone() ;
		vehicle.update(1.0/60) ;
		var newPosition = vehicle.position.clone() ;

		//var xDiff = newPosition.x - oldPosition.x;
		//var yDiff = newPosition.y - oldPosition.y;
		//var zDiff = newPosition.z - oldPosition.z;
        //console.log(Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2) + Math.pow(zDiff, 2)));
        //console.log(Math.floor(Math.sqrt(Math.pow(newPosition.x - oldPosition.x, 2) + Math.pow(newPosition.y - oldPosition.y, 2) + Math.pow(newPosition.z - oldPosition.z, 2))));

        newPosition.sub(oldPosition) ;

		// NAV
		NAV.move(newPosition.x, newPosition.y, 150,10) ;
		// carPosition
		carPosition.position.set(NAV.x, NAV.y, NAV.z) ;
		// Updates the vehicle
		vehicle.position.x = NAV.x ;
		vehicle.position.y = NAV.Y ;
		// Updates carFloorSlope
		carFloorSlope.matrixAutoUpdate = false;		
		carFloorSlope.matrix.copy(NAV.localMatrix(CARx,CARy));
		// Updates carRotationZ
		carRotationZ.rotation.z = vehicle.angles.z-Math.PI/2.0 ;
		// Camera
		// renderingEnvironment.camera.position.x = NAV.x ;
		// renderingEnvironment.camera.position.y = NAV.y ;
		// renderingEnvironment.camera.position.z = NAV.z+50+vehicle.speed.length()*2 ;
        var plane = parseInt(NAV.findActive(NAV.x, NAV.y), 10);
		if(cinematic)
		{
			renderingEnvironment.camera.position.x = cameraSet[plane].x ;
			renderingEnvironment.camera.position.y = cameraSet[plane].y ;
			renderingEnvironment.camera.position.z = NAV.z + cameraZ ;
			renderingEnvironment.camera.up = new THREE.Vector3(0,0,1);
			renderingEnvironment.camera.lookAt(NAV);
		}else{
            var pivot = vehicle.angularSpeed.z / 9;
		    cameraPivot.rotation.z = pivot > Math.PI / 2 ? Math.PI / 2 : pivot < - Math.PI / 2 ? - Math.PI / 2 : pivot;
		    renderingEnvironment.camera.up = renderingEnvironment.up;
        }
        if(plane === 1 || plane === 12 || plane === 23){
			var index = Math.floor(plane / 10);
			if((index !== 0 && checkpoints[index - 1]) || index === 0) {
                checkpoints[index] = true;
            }
		}
		if(prevPlane === 0 && plane === 29){
            wrongDirectionDiv.innerHTML = 'WRONG DIRECTION !';
        }else if(prevPlane === 29 && plane === 0){
            wrongDirectionDiv.innerHTML = '';
        }else if(plane > prevPlane){
            wrongDirectionDiv.innerHTML = '';
            if(plane === 1) {
                if(!clock.running){
                    clock.start();
                }
                var lapOK = true;
                for (var i = 0; i < nbCheckpoints && lapOK; i++) {
                    if (!checkpoints[i]) {
                        lapOK = false;
                    }
                }
                if (lapOK) {
                    resetCheckpoints();
                    nbLaps++;
                    var lapTime = clock.getElapsedTime();
                    timeBoardString += 'Lap ' + nbLaps + ' : ' + Math.floor((lapTime - lastLapTime) * 100) / 100 + '\n';
                    lastLapTime = lapTime;
                }
            }
        }else if(plane < prevPlane ){
		    wrongDirectionDiv.innerHTML = 'WRONG DIRECTION !';
        }
        speedDiv.innerHTML = 'Speed : ' + Math.floor(Math.sqrt(Math.pow(vehicle.speed.x, 2) + Math.pow(vehicle.speed.y, 2) + Math.pow(vehicle.speed.z, 2)));
		clockDiv.innerText = Math.floor(clock.getElapsedTime() * 100) / 100 + '';
		timeBoardDiv.innerText = timeBoardString;
		// Rendering
		renderingEnvironment.renderer.render(renderingEnvironment.scene, renderingEnvironment.camera);
		prevPlane = plane;
	}

	render(); 
}
