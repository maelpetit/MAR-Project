//Loads all dependencies
requirejs(['ModulesLoaderV2.js'], function()
    {
        // Level 0 includes
        ModulesLoader.requireModules(["threejs/three.min.js"]) ;

        ModulesLoader.requireModules([
            "ParticleSystem.js",
            "Interpolators.js",
            "MathExt.js"
        ]);
    }
) ;

function addParticlesToCar(carGeometry, particleSystems){
    var positionRight = {x: 2.8, y: -7, z: 1.5};
    var jfpsRight = createJetFireParticleSystem(positionRight);
    particleSystems.push({
        name:"jetFire", particles:jfpsRight, object:carGeometry, isActive: false
    });
    //carGeometry.add(jfpsRight.particleSystem);
    var positionLeft = {x: -2.8, y: -7, z: 1.5};
    var jfpsLeft = createJetFireParticleSystem(positionLeft);
    particleSystems.push({
        name:"jetFire", particles:jfpsLeft, object:carGeometry, isActive: false
    });
    //carGeometry.add(jfpsLeft.particleSystem);
    var tfpsRight = createTurboFireParticleSystem(positionRight);
    particleSystems.push({
        name:"turboFire", particles:tfpsRight, object:carGeometry, isActive: false
    });
    //carGeometry.add(tfpsRight.particleSystem);
    var tfpsLeft = createTurboFireParticleSystem(positionLeft);
    particleSystems.push({
        name:"turboFire", particles:tfpsLeft, object:carGeometry, isActive: false
    });
    //carGeometry.add(tfpsLeft.particleSystem);
}

function createJetFireParticleSystem(position){
    var particleSystem = new ParticleSystem.Engine_Class({
        textureFile : "assets/particles/particle.png",
        particlesCount : 1000,
        blendingMode : THREE.AdditiveBlending
    });

    var emitter = new ParticleSystem.ConeEmitter_Class({
        cone: {
            center: new THREE.Vector3(position.x,position.y,position.z),
            height: new THREE.Vector3(0,-1,0),
            radius: 0.2,
            flow: 100
        },
        particle: {
            speed: new MathExt.Interval_Class(5, 5),
            mass: new MathExt.Interval_Class(0.1, 0.1),
            size: new MathExt.Interval_Class(0.1, 5),
            lifeTime: new MathExt.Interval_Class(0.5, 1)
        }
    });

    particleSystem.addEmitter(emitter);
    particleSystem.addModifier(new ParticleSystem.LifeTimeModifier_Class());
    // particleSystem.addModifier(new ParticleSystem.ForceModifier_Weight_Class());
    particleSystem.addModifier(new ParticleSystem.PositionModifier_EulerItegration_Class());
    particleSystem.addModifier(new ParticleSystem.OpacityModifier_TimeToDeath_Class(
        new Interpolators.Linear_Class(0.7,1)
    ));
    particleSystem.addModifier(new ParticleSystem.ColorModifier_TimeToDeath_Class(
        {r:0.1,g:0.1,b:0.1},{r:0.5,g:0,b:0}
    ));

    return particleSystem;
}

function createTurboFireParticleSystem(position){
    var particleSystem = new ParticleSystem.Engine_Class({
        textureFile : "assets/particles/particle.png",
        particlesCount : 1000,
        blendingMode : THREE.AdditiveBlending
    });

    var emitter = new ParticleSystem.ConeEmitter_Class({
        cone: {
            center: new THREE.Vector3(position.x,position.y,position.z),
            height: new THREE.Vector3(0,-1,0),
            radius: 0.2,
            flow: 100
        },
        particle: {
            speed: new MathExt.Interval_Class(10, 10),
            mass: new MathExt.Interval_Class(0.1, 0.1),
            size: new MathExt.Interval_Class(0.1, 4),
            lifeTime: new MathExt.Interval_Class(0.5, 0.7)
        }
    });

    particleSystem.addEmitter(emitter);
    particleSystem.addModifier(new ParticleSystem.LifeTimeModifier_Class());
    // particleSystem.addModifier(new ParticleSystem.ForceModifier_Weight_Class());
    particleSystem.addModifier(new ParticleSystem.PositionModifier_EulerItegration_Class());
    particleSystem.addModifier(new ParticleSystem.OpacityModifier_TimeToDeath_Class(
        new Interpolators.Linear_Class(0.7,0.9)
    ));
    particleSystem.addModifier(new ParticleSystem.ColorModifier_TimeToDeath_Class(
        {r:0.5,g:0,b:0},{r:0,g:0,b:0.5}
    ));

    return particleSystem;
}

function createWaterFountainParticleSystem(position){
    var particleSystem = new ParticleSystem.Engine_Class({
        textureFile : "assets/particles/particle.png",
        particlesCount : 5000,
        blendingMode : THREE.AdditiveBlending
    });
    var emitter = new ParticleSystem.ConeEmitter_Class({
        cone: {
            center: new THREE.Vector3(position.x,position.y,position.z),
            height: new THREE.Vector3(-0.5,0,1),
            radius: 0.5,
            flow: 100
        },
        particle: {
            speed: new MathExt.Interval_Class(10, 20),
            mass: new MathExt.Interval_Class(0.1, 0.1),
            size: new MathExt.Interval_Class(0.1, 10),
            lifeTime: new MathExt.Interval_Class(0.5, 10)
        }
    });

    particleSystem.addEmitter(emitter);
    particleSystem.addModifier(new ParticleSystem.LifeTimeModifier_Class());
    particleSystem.addModifier(new ParticleSystem.ForceModifier_Weight_Class());
    particleSystem.addModifier(new ParticleSystem.PositionModifier_EulerItegration_Class());
    particleSystem.addModifier(new ParticleSystem.PositionModifier_PlaneBounce_Class(
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(-2,0,1),
        1
    ));
    particleSystem.addModifier(new ParticleSystem.OpacityModifier_TimeToDeath_Class(
        new Interpolators.Linear_Class(0.7,0.9)
    ));
    particleSystem.addModifier(new ParticleSystem.ColorModifier_TimeToDeath_Class(
        {r:0,g:0,b:0.1},{r:0,g:0,b:0.9}
    ));

    return particleSystem;
}

//TODO
function createSmokeParticleSystem(position){
    var particleSystem = new ParticleSystem.Engine_Class({
        textureFile : "assets/particles/particle.png",
        particlesCount : 10000,
        blendingMode : THREE.AdditiveBlending
    });

    var emitter = new ParticleSystem.ConeEmitter_Class({
        cone: {
            center: new THREE.Vector3(position.x,position.y,position.z),
            height: new THREE.Vector3(0,0,1),
            radius: 10,
            flow: 1000
        },
        particle: {
            speed: new MathExt.Interval_Class(4, 5),
            mass: new MathExt.Interval_Class(1, 1),
            size: new MathExt.Interval_Class(0.1, 1),
            lifeTime: new MathExt.Interval_Class(0.5, 10)
        }
    });

    particleSystem.addEmitter(emitter);
    particleSystem.addModifier(new ParticleSystem.LifeTimeModifier_Class());
    particleSystem.addModifier(new ParticleSystem.ForceModifier_Weight_Class());
    particleSystem.addModifier(new ParticleSystem.PositionModifier_EulerItegration_Class());
    particleSystem.addModifier(new ParticleSystem.OpacityModifier_TimeToDeath_Class(
        new Interpolators.Linear_Class(1,1)
    ));
    particleSystem.addModifier(new ParticleSystem.ColorModifier_TimeToDeath_Class(
        {r:0,g:0,b:0},{r:1,g:1,b:1}
    ));

    return particleSystem;
}

