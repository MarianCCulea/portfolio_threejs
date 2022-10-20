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
      color: 0xffffff,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.position.y = -3;
    this.plane.receiveShadow = true;
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 40);

    const material = new THREE.MeshStandardMaterial({ color: 0xffcb6a });
    const material2 = new THREE.MeshStandardMaterial({ color: 0x9d3b60 });
    const material3 = new THREE.MeshStandardMaterial({ color: 0x8e99ce });

    this.circle = new THREE.Mesh(geometry, material);
    this.circle2 = new THREE.Mesh(geometry, material2);
    this.circle3 = new THREE.Mesh(geometry, material3);

    this.circle.position.y = -0.29;
    this.circle2.position.y = -0.28;
    this.circle3.position.y = -0.27;

    this.circle.scale.set(0, 0, 0);
    this.circle2.scale.set(0, 0, 0);
    this.circle3.scale.set(0, 0, 0);

    this.circle.rotation.x = -Math.PI / 2;
    this.circle2.rotation.x = -Math.PI / 2;
    this.circle3.rotation.x = -Math.PI / 2;

    this.circle.receiveShadow = true;
    this.circle2.receiveShadow = true;
    this.circle3.receiveShadow = true;
    this.scene.add(this.circle);
    this.scene.add(this.circle2);
    this.scene.add(this.circle3);
  }
  resize() {}
  update() {}
}
