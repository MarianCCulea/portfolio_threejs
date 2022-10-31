import Experience from "../Experience";
import * as THREE from "three";
import { BufferAttribute } from "three";
import GSAP from "gsap";

export default class Floaters {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.circle = this.resources.items.circle;
    //this.target = this.resources.items.floaters; //target is item name from assets.js
    //this.floaters = this.target.scene;
    this.unsorted = {};
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.3,
    };

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;

    const positionArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      // positionArray[i] = Math.random();
      positionArray[i] = (Math.random() - 0.5) * 12;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)
    );

    this.particlesMaterialLight = new THREE.PointsMaterial({
      size: 0.04,
      map: this.circle,
      transparent: true,
      color: 0x263232,
    });

    this.particlesMesh = new THREE.Points(
      particlesGeometry,
      this.particlesMaterialLight
    );

    this.scene.add(this.particlesMesh);
    console.log(this.particlesMesh);
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    this.progress = 0;
    this.dummy = new THREE.Vector3(0, 0, 0);
    this.dummy2 = new THREE.Vector3(0, 0, 0);
    const geometry = new THREE.SphereGeometry(0.5, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere2 = new THREE.Points(geometry, this.particlesMaterialLight);

    // this.scene.add(this.sphere);
    // this.scene.add(this.sphere2);
    //this.setPath();
    //this.setModel();
    this.onMouseMove();
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.particlesMesh.material.color, {
        r: 1,
        g: 1,
        b: 1,
      });
    } else {
      GSAP.to(this.particlesMesh.material.color, {
        r: 0,
        g: 0,
        b: 0,
      });
    }
  }

  setPath() {
    this.curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-5, 1, 0),
        new THREE.Vector3(0, 1, -5),
        new THREE.Vector3(5, 1, 0),
        new THREE.Vector3(0, 1, 5),
      ],
      true
    );

    this.curve2 = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(0, 1.3, -5.2),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(0, 1, 5),
      ],
      true
    );

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);
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
    //this.cv.position.y = -2;
    //this.cvChildren.picture.scale.set(1, 1, 1);
    this.scene.add(this.cv);
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientY - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.008 * -1;
    });
  }

  resize() {}
  update() {
    // this.curve.getPointAt(this.progress % 1, this.dummy);

    // this.curve2.getPointAt(this.progress % 1, this.dummy2);

    this.progress += 0.00001;
    this.particlesMesh.rotation.y = this.progress;
    // this.sphere.position.copy(this.dummy);
    // this.sphere2.position.copy(this.dummy2);

    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.particlesMesh.rotation.x = this.lerp.current;
  }
}
