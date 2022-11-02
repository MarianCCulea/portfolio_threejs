import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Phone {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.target = this.resources.items.phone; //target is item name from assets.js
    this.phone = this.target.scene;
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
    this.gui.add(this.boxobj.position, "x", 0, 4).onChange(() => {
      this.phone.position.x = this.boxobj.position.x;
    });
    this.gui.add(this.boxobj.position, "y", 0, 4).onChange(() => {
      this.phone.position.y = this.boxobj.position.y;
    });
    this.gui.add(this.boxobj.position, "z", 0, 4).onChange(() => {
      this.phone.position.z = this.boxobj.position.z;
    });
    this.gui.add(this.boxobj.rotation, "x", 0, 2).onChange(() => {
      this.phone.rotation.x = this.boxobj.rotation.x;
    });
    this.gui.add(this.boxobj.rotation, "y", 0, 2).onChange(() => {
      this.phone.rotation.y = this.boxobj.rotation.y;
    });
    this.gui.add(this.boxobj.rotation, "z", 0, 2).onChange(() => {
      this.phone.rotation.z = this.boxobj.rotation.z;
    });
  }

  setModel() {
    console.log(this.phone);

    this.resources.items.phonevid.flipY = false;
    this.phone.children[0].children[2].material = new THREE.MeshBasicMaterial({
      map: this.resources.items.phonevid,
    });
    this.phone.position.set(2.156, 0.484, 2.404);
    this.phone.scale.set(0, 0, 0);

    this.phone.rotation.x = -Math.PI / 4;
    //this.phone.rotation.z = Math.PI;
    // this.phone.position.z = 2.25;
    // this.phone.position.x = 0.8;
    this.scene.add(this.phone);
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
    this.phone.rotation.z = this.lerp.current;
  }
}
