import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.target = this.resources.items.target; //target is item name from assets.js
    this.actualTarget = this.target.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    //this.setAnimation();
    this.onMouseMove();
  }

  setModel() {
    this.actualTarget.children.forEach((element) => {
      element.castShadow = true;
      element.receiveShadow = true;
      if (element instanceof THREE.Group) {
        element.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }
      if (element.name === "AquaGlass") {
        element.material = new THREE.MeshPhysicalMaterial();
        element.material.roughness = 0;
        element.material.color.set(0x549dd2);
        element.material.ior = 3;
        element.material.transmission = 1;
        element.material.opacity = 1;
      }
    });
    this.scene.add(this.actualTarget);
    this.actualTarget.scale.set(0.11, 0.11, 0.11);
    this.actualTarget.rotation.y = Math.PI;
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualTarget);
    this.swim = this.mixer.clipAction(this.room.animations[0]);
    this.swim.play();
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
    this.actualTarget.rotation.y = this.lerp.current;
    //this.mixer.update(this.time.delta);
  }
}
