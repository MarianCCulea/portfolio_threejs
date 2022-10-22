import Experience from "./Experience";
import Sizes from "./Utils/Sizes";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.gui = new GUI({ container: document.querySelector(".hero-main") });
    this.obj = { colorObj: { r: 0, b: 0, c: 0 }, intensity: 3 };
    this.boxobj = {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    };

    //
    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
    this.setGUI();
  }

  setGUI() {
    this.gui.add(this.boxobj.position, "x", 0, 15).onChange(() => {
      this.perspectiveCamera.position.x = this.boxobj.position.x;
    });
    this.gui.add(this.boxobj.position, "y", 0, 15).onChange(() => {
      this.perspectiveCamera.position.y = this.boxobj.position.y;
    });
    this.gui.add(this.boxobj.position, "z", 0, 15).onChange(() => {
      this.perspectiveCamera.position.z = this.boxobj.position.z;
    });
    this.gui.add(this.boxobj.rotation, "x", 0, 6).onChange(() => {
      this.perspectiveCamera.rotation.x = this.boxobj.rotation.x;
    });
    this.gui.add(this.boxobj.rotation, "y", 0, 6).onChange(() => {
      this.perspectiveCamera.rotation.y = this.boxobj.rotation.y;
    });
    this.gui.add(this.boxobj.rotation, "z", 0, 6).onChange(() => {
      this.perspectiveCamera.rotation.z = this.boxobj.rotation.z;
    });
    // this.gui.addColor(this.obj, "colorObj").onChange(() => {
    //   this.sunLight.color.copy(this.obj.colorObj);
    //   this.ambientLight.color.copy(this.obj.colorObj);
    //   console.log(this.obj.colorObj);
    // });

    // this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
    //   this.sunLight.intensity = this.obj.intensity;
    //   this.sunLight.ambientLight = this.obj.intensity;
    // });
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.z = 6;
    this.perspectiveCamera.position.x = 0;
    this.perspectiveCamera.position.y = 6;
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frostrum) / 2,
      (this.sizes.aspect * this.sizes.frostrum) / 2,
      this.sizes.frostrum / 2,
      -this.sizes.frostrum / 2,
      -50,
      50
    );
    this.orthographicCamera.position.y = 4;
    this.orthographicCamera.position.z = 5;
    this.orthographicCamera.rotation.x = Math.PI / 6;

    this.scene.add(this.orthographicCamera);

    this.helper = new THREE.CameraHelper(this.orthographicCamera);
    //this.scene.add(this.helper);
    const size = 20;
    const divisions = 20;
    const gridH = new THREE.GridHelper(size, divisions);

    const axesHelper = new THREE.AxesHelper(10);

    /////////////////////////////////////////////////////////////////////////////////
    // this.scene.add(gridH);
    // this.scene.add(axesHelper);
  }
  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }
  resize() {
    //update perspective cam on resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    //update ortho cam on resize

    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frostrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frostrum) / 2;
    this.orthographicCamera.top = this.sizes.frostrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frostrum / 2;

    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();

    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
