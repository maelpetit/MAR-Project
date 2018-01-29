function Helico(initPosition, Loader){
    this.helico_position = new THREE.Object3D();
    this.helico_position.position.x = initPosition.x;
    this.helico_position.position.y = initPosition.y;
    this.helico_position.position.z = initPosition.z;

    this.helico_rotationZ = new THREE.Object3D();
    this.helico_position.add(this.helico_rotationZ);

    this.helico_left_turbine = Loader.load({filename:"assets/helico/turbine.obj", node: this.helico_rotationZ});
    this.helico_left_turbine.position.x = -8.5;
    this.helico_left_turbine.position.y = -3;
    this.helico_left_turbine.position.z = 4;

    this.helico_left_axis = Loader.load({filename:"assets/helico/axe.obj", node: this.helico_rotationZ});
    this.helico_left_axis.position.x = -8.5;
    this.helico_left_axis.position.y = -2;
    this.helico_left_axis.position.z = 4;

    this.helico_right_turbine = Loader.load({filename:"assets/helico/turbine.obj", node: this.helico_rotationZ});
    this.helico_right_turbine.position.x = 8.5;
    this.helico_right_turbine.position.y = -3;
    this.helico_right_turbine.position.z = 4;

    this.helico_right_axis = Loader.load({filename:"assets/helico/axe.obj", node: this.helico_rotationZ});
    this.helico_right_axis.position.x = 8.5;
    this.helico_right_axis.position.y = -2;
    this.helico_right_axis.position.z = 4;

    this.helico_central_turbine = Loader.load({filename:"assets/helico/turbine.obj", node: this.helico_rotationZ});
    this.helico_central_turbine.position.x = 0;
    this.helico_central_turbine.position.y = 0;
    this.helico_central_turbine.position.z = 4;
    this.helico_central_turbine.rotation.x = Math.PI / 2;

    this.helico_central_axis = Loader.load({filename:"assets/helico/axe.obj", node: this.helico_rotationZ});
    this.helico_central_axis.position.x = 0;
    this.helico_central_axis.position.y = 0;
    this.helico_central_axis.position.z = 5;
    this.helico_central_axis.rotation.x = Math.PI / 2;

    var nbBlades = 3;

    for(var i = 0; i < nbBlades; i++){
        var angle = (i + 1)*(2 * Math.PI / nbBlades);
        var right_blade = Loader.load({filename:"assets/helico/pale.obj", node: this.helico_right_axis});
        right_blade.position.y = 2;
        right_blade.rotation.y = angle;
        var left_blade = Loader.load({filename:"assets/helico/pale.obj", node: this.helico_left_axis});
        left_blade.position.y = 2;
        left_blade.rotation.y = angle;
        var central_blade = Loader.load({filename:"assets/helico/pale.obj", node: this.helico_central_axis});
        central_blade.position.y = 2;
        central_blade.rotation.y = angle;
    }

    this.helico_body = Loader.load({filename:"assets/helico/helicoCorp.obj", node: this.helico_rotationZ});

    return this;
}