import Experience from "../Experience";
import Room from "./Room";
import Cv from "./Cv";
import Enviroment from "./Enviroment";
import Controls from "./Controls";
import Floor from "./Floor";
import EventEmitter from "events";
import Floaters from "./Floaters";
import Phone from "./Phone";
import Screen from "./Screen";

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
      this.phone = new Phone();
      this.screen = new Screen();
      this.cv = new Cv();
      this.floaters = new Floaters();
      this.enviroment = new Enviroment(this.floaters);
      this.floor = new Floor();
      this.emit("worldready");
    });

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme);
    });
  }

  switchTheme(theme) {
    if (this.cv) {
      this.cv.switchTheme(theme);
    }
    if (this.floaters) {
      this.floaters.switchTheme(theme);
    }
    if (this.enviroment) {
      this.enviroment.switchTheme(theme);
    }
  }

  resize() {}
  update() {
    if (this.phone) {
      this.phone.update();
    }
    if (this.screen) {
      this.screen.update();
    }
    if (this.cv) {
      this.cv.update();
    }
    if (this.floaters) {
      this.floaters.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
