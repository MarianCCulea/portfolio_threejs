import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";

export default class Cv {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.target = this.resources.items.cv; //target is item name from assets.js
    this.cv = this.target.scene;
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };
    console.log(this.target);
    console.log(this.cv);
    this.setModel();
    this.onMouseMove();
  }

  setModel() {
    this.cv.children.forEach((element) => {
      element.castShadow = true;
      element.receiveShadow = true;
      if (element instanceof THREE.Group) {
        element.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }
      if (element.name === "Picture") {
        console.log(element);
        element.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.pic,
        });
      }
    });
    this.scene.add(this.cv);
    //this.cv.scale.set(0.11, 0.11, 0.11);
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
    this.cv.rotation.y = this.lerp.current;
  }
}
