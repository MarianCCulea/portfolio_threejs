import Experience from "../Experience";
import Room from "./Room";
import Cv from "./Cv";
import Enviroment from "./Enviroment";
import Controls from "./Controls";
import Floor from "./Floor";
import EventEmitter from "events";

export default class World extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.theme = this.experience.theme;

    this.resources.on("ready", () => {
      this.enviroment = new Enviroment();
      this.floor = new Floor();
      this.cv = new Cv();
      this.controls = new Controls(); //maybe off
      this.emit("worldready");
    });

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme);
    });
  }

  switchTheme(theme) {
    if (this.enviroment) {
      this.enviroment.switchTheme(theme);
    }
  }

  resize() {}
  update() {
    if (this.cv) {
      this.cv.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
