import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Screen {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.target = this.resources.items.screen; //target is item name from assets.js
    this.screen = this.target.scene;
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    // this.gui = new GUI({ container: document.querySelector(".hero-main") });
    // this.obj = { colorObj: { r: 0, b: 0, c: 0 }, intensity: 3 };
    // this.boxobj = {
    //   position: { x: 0, y: 0, z: 0 },
    //   rotation: { x: 0, y: 0, z: 0 },
    // };

    this.setModel();
    this.onMouseMove();

    //this.setGUI();
  }

  setGUI() {
    this.gui.add(this.boxobj.position, "x", 0, 15).onChange(() => {
      this.screen.position.x = this.boxobj.position.x;
    });
    this.gui.add(this.boxobj.position, "y", 0, 15).onChange(() => {
      this.screen.position.y = this.boxobj.position.y;
    });
    this.gui.add(this.boxobj.position, "z", 0, 15).onChange(() => {
      this.screen.position.z = this.boxobj.position.z;
    });
    this.gui.add(this.boxobj.rotation, "x", 0, 25).onChange(() => {
      this.screen.rotation.x = this.boxobj.rotation.x;
    });
    this.gui.add(this.boxobj.rotation, "y", 0, 25).onChange(() => {
      this.screen.rotation.y = this.boxobj.rotation.y;
    });
    this.gui.add(this.boxobj.rotation, "z", 0, 25).onChange(() => {
      this.screen.rotation.z = this.boxobj.rotation.z;
    });
  }
  setModel() {
    this.screen.children.forEach((element) => {
      element.castShadow = true;
      element.receiveShadow = true;
      if (element instanceof THREE.Group) {
        element.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }
    });
    this.res;
    this.screen.children[0].children[0].material = new THREE.MeshBasicMaterial({
      map: this.resources.items.screenvid,
    });
    this.screen.position.set(2, 2, 1);
    this.screen.scale.set(0, 0, 0); //2
    this.screen.rotation.x = -Math.PI / 4;
    this.screen.rotation.y = Math.PI / 2;

    this.scene.add(this.screen);
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}
  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.screen.rotation.y = this.lerp.current - 0.1;
  }
}
