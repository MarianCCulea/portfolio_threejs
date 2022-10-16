import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Enviroment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // this.geometry = new THREE.BoxGeometry(2, 2);
    // this.material = new THREE.MeshStandardMaterial({
    //   color: 0xff33ff,
    // });
    // this.plane = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(this.plane);
    // this.gui = new GUI({ container: document.querySelector(".hero-main") });
    // this.obj = { colorObj: { r: 0, b: 0, c: 0 }, intensity: 3 };
    // this.boxobj = {
    //   position: { x: 0, y: 0, z: 0 },
    //   rotation: { x: 0, y: 0, z: 0 },
    // };
    //this.setGUI();

    this.setSunLight();
  }

  setGUI() {
    this.gui.add(this.boxobj.position, "x", 0, 6).onChange(() => {
      this.plane.position.x = this.boxobj.position.x;
    });
    this.gui.add(this.boxobj.position, "y", 0, 6).onChange(() => {
      this.plane.position.y = this.boxobj.position.y;
    });
    this.gui.add(this.boxobj.position, "z", 0, 6).onChange(() => {
      this.plane.position.z = this.boxobj.position.z;
    });
    this.gui.add(this.boxobj.rotation, "x", 0, 6).onChange(() => {
      this.plane.rotation.x = this.boxobj.rotation.x;
    });
    this.gui.add(this.boxobj.rotation, "y", 0, 6).onChange(() => {
      this.plane.rotation.y = this.boxobj.rotation.y;
    });
    this.gui.add(this.boxobj.rotation, "z", 0, 6).onChange(() => {
      this.plane.rotation.z = this.boxobj.rotation.z;
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
  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);
    this.sunLight.position.set(1.5, 7, 3);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 0.172,
        g: 0.2313,
        b: 0.6862,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.172,
        g: 0.2313,
        b: 0.6862,
      });
      GSAP.to(this.sunLight, {
        intensity: 0.78,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.78,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 1,
        g: 1,
        b: 1,
      });
      GSAP.to(this.ambientLight.color, {
        r: 1,
        g: 1,
        b: 1,
      });
      GSAP.to(this.sunLight, {
        intensity: 3,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1,
      });
    }
  }
  resize() {}
  update() {}
}
