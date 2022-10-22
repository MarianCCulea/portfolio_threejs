import Experience from "./Experience";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";

import * as THREE from "three";
export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.setRenderer();
  }
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputencoding - THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
    this.renderer.setClearColor(new THREE.Color("#21282a"), 1);
    /////////////////////////////////////////////////////

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(
      new RenderPass(this.scene, this.camera.perspectiveCamera)
    );
    this.bokeh = new BokehPass(this.scene, this.camera.perspectiveCamera, {
      focus: 10,
      aperture: 0.0009,
      maxblur: 1,
      width: this.sizes.width,
      height: this.sizes.height,
    });
    this.composer.addPass(this.bokeh);
    console.log(this.bokeh);
  }
  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
    this.composer.setSize(this.sizes.width, this.sizes.height);
    this.composer.setPixelRatio(this.sizes.pixelRatio);
  }
  update() {
    //this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
    // this.renderer.render(this.scene, this.camera.perspectiveCamera);
    this.composer.render();
    //second screen
    // this.renderer.setScissorTest(true);
    // this.renderer.setViewport(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3
    // );
    // this.renderer.setScissor(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3
    // );

    // this.renderer.render(this.scene, this.camera.orthographicCamera);
    // this.renderer.setScissorTest(false);
  }
}
