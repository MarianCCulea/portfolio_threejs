import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
import GUI from "lil-gui";

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

    // this.gui = new GUI({ container: document.querySelector(".hero-main") });
    // this.obj = { colorObj: { r: 0, b: 0, c: 0 }, intensity: 3 };
    // this.boxobj = {
    //   position: { x: 0, y: 0, z: 0 },
    // };

    this.setModel();
    this.onMouseMove();
    //this.setGUI();
  }

  setGUI() {
    this.gui.add(this.boxobj.position, "x", 0, 4).onChange(() => {
      this.cv.position.x = this.boxobj.position.x;
    });
    this.gui.add(this.boxobj.position, "y", 0, 6).onChange(() => {
      this.cv.position.y = this.boxobj.position.y;
    });
    this.gui.add(this.boxobj.position, "z", 0, 6).onChange(() => {
      this.cv.position.z = this.boxobj.position.z;
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

  setModel() {
    console.log(this.cv.children);
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
    console.log(this.cv);
    this.scene.add(this.cv);
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  switchTheme(theme) {
    // console.log(this.cvChildren.main_side.material.color);
    // this.cvChildren.main_side.material.color.setHex(0x576464);
    console.log(this.cvChildren);
    if (theme === "dark") {
      1;
      this.cv.children.forEach((groupchild) => {
        if ((groupchild.name.toLowerCase() + "").startsWith("progressbase")) {
          GSAP.to(groupchild.children[0].material.color, {
            r: 1,
            g: 1,
            b: 1,
          });
          GSAP.to(groupchild.children[1].material.color, {
            r: 1,
            g: 1,
            b: 1,
          });
        } else {
          if (groupchild.material.name.toLowerCase() + "" === "dots") {
            GSAP.to(groupchild.material.color, {
              r: 1,
              g: 1,
              b: 1,
            });
          } else if (groupchild.material.name.toLowerCase() + "" === "text") {
            GSAP.to(groupchild.material.color, {
              r: 1,
              g: 1,
              b: 1,
            });
          } else if (
            groupchild.material.name.toLowerCase() + "" ===
            "controller"
          ) {
            GSAP.to(groupchild.material.color, {
              r: 1,
              g: 1,
              b: 1,
            });
          } else if (
            groupchild.material.name.toLowerCase() + "" ===
            "leftside"
          ) {
            GSAP.to(groupchild.material.color, {
              r: 0.6,
              g: 0.4,
              b: 0.1,
            });
          } else if (
            groupchild.material.name.toLowerCase() + "" ===
            "mainpage"
          ) {
            GSAP.to(groupchild.material.color, {
              r: 0.3411764705882353,
              g: 0.39215686274509803,
              b: 0.39215686274509803,
            });
          }
        }
      });
    } else {
      this.cv.children.forEach((groupchild) => {
        if ((groupchild.name.toLowerCase() + "").startsWith("progressbase")) {
          GSAP.to(groupchild.children[0].material.color, {
            r: 0.013702082447707653,
            g: 0.020288560539484024,
            b: 0.020288558676838875,
          });
          GSAP.to(groupchild.children[1].material.color, {
            r: 0.05126946046948433,
            g: 0.07618541270494461,
            b: 0.07618542015552521,
          });
        } else {
          if (groupchild.material.name.toLowerCase() + "" === "dots") {
            GSAP.to(groupchild.material.color, {
              r: 0.013702082447707653,
              g: 0.020288560539484024,
              b: 0.020288558676838875,
            });
          } else if (groupchild.material.name.toLowerCase() + "" === "text") {
            GSAP.to(groupchild.material.color, {
              r: 0.019382363185286522,
              g: 0.031896043568849564,
              b: 0.031896043568849564,
            });
          } else if (
            groupchild.material.name.toLowerCase() + "" ===
            "controller"
          ) {
            GSAP.to(groupchild.material.color, {
              r: 0.05126946046948433,
              g: 0.07618541270494461,
              b: 0.07618542015552521,
            });
          } else if (
            groupchild.material.name.toLowerCase() + "" ===
            "leftside"
          ) {
            GSAP.to(groupchild.material.color, {
              r: 0.30054381489753723,
              g: 0.4072403311729431,
              b: 0.7835379838943481,
            });
          } else if (
            groupchild.material.name.toLowerCase() + "" ===
            "main_side"
          ) {
            GSAP.to(groupchild.material.color, {
              r: 0.9734449982643127,
              g: 0.7758219838142395,
              b: 0.6375972032546997,
            });
          }
        }
      });
    }
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
