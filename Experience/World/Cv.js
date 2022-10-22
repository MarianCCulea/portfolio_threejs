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
    this.unsorted = {};
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };
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
        element.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.pic,
        });
      }
      element.scale.set(0, 0, 0);

      this.unsorted[element.name.toLowerCase()] = element;
    });
    this.cvChildren = Object.keys(this.unsorted)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = this.unsorted[key];

        return accumulator;
      }, {});
    this.cv.rotation.x = -Math.PI / 4;
    this.cv.position.z = 2.25;
    this.cv.position.x = 0.8;
    //this.cvChildren.picture.scale.set(1, 1, 1);
    this.scene.add(this.cv);
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

    this.experience.renderer.bokeh.uniforms.focus.value =
      this.experience.renderer.camera.perspectiveCamera.position.z -
      this.cv.position.z +
      2.25;
    //console.log(this.experience.renderer.bokeh.uniforms.focus.value);
  }
}
