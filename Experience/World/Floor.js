import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
  }
  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xfbf4e4,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.position.y = -2.56;
    this.plane.receiveShadow = true;
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 40);

    const material = new THREE.MeshStandardMaterial({ color: 0xf2b647 });
    const material2 = new THREE.MeshStandardMaterial({ color: 0x95abe5 });
    const material3 = new THREE.MeshStandardMaterial({ color: 0xdb929d });
    const material4 = new THREE.MeshStandardMaterial({ color: 0x7bd0ad });

    this.circle = new THREE.Mesh(geometry, material);
    this.circle2 = new THREE.Mesh(geometry, material2);
    this.circle3 = new THREE.Mesh(geometry, material3);
    this.circle4 = new THREE.Mesh(geometry, material4);

    this.circle.position.y = -2.55;
    this.circle2.position.y = -2.54;
    this.circle3.position.y = -2.53;
    this.circle4.position.y = -2.52;

    this.circle.scale.set(0, 0, 0);
    this.circle2.scale.set(0, 0, 0);
    this.circle3.scale.set(0, 0, 0);
    this.circle4.scale.set(0, 0, 0);

    this.circle.rotation.x = -Math.PI / 2;
    this.circle2.rotation.x = -Math.PI / 2;
    this.circle3.rotation.x = -Math.PI / 2;
    this.circle4.rotation.x = -Math.PI / 2;

    this.circle.receiveShadow = true;
    this.circle2.receiveShadow = true;
    this.circle3.receiveShadow = true;
    this.circle4.receiveShadow = true;
    this.scene.add(this.circle);
    this.scene.add(this.circle2);
    this.scene.add(this.circle3);
    this.scene.add(this.circle4);
  }
  resize() {}
  update() {}
}
