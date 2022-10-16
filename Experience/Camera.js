import Experience from "./Experience";
import Sizes from "./Utils/Sizes";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.z = 11;
    this.perspectiveCamera.position.x = 11;
    this.perspectiveCamera.position.y = 15;
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
    //this.scene.add(gridH);

    const axesHelper = new THREE.AxesHelper(10);
    //this.scene.add(axesHelper);
  }
  setOrbitControls() {
    this.controls = new OrbitControls(this.orthographicCamera, this.canvas);
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
