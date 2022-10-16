import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans";

export default class Preloader extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.world = this.experience.world;
    this.room = this.world.room;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero-main-title"));
    convert(document.querySelector(".hero-main-description"));
    convert(document.querySelector(".hero-second-subheading"));
    convert(document.querySelector(".secondsb"));
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animate", { y: 0, yPercent: 100 });

      if (this.device === "desktop") {
        this.timeline.to(".preloader", {
          opacity: 0,
          delay: 1,
          onComplete: () => {
            document.querySelector(".preloader").classList.add("hidden");
          },
        });

        this.timeline.to(this.world.room.actualTarget, {
          x: 1.4,
        });
      } else {
        this.timeline.to(this.world.room.actualTarget, {
          x: 1.4,
        });
      }
      this.timeline.to(".intro-text .animate", {
        yPercent: 0,
        stagger: 0.07,
        ease: "back.out(1.2)",
        onComplete: resolve,
      });
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      if (this.device === "desktop") {
      } else {
      }
    });
  }
  async playSecondIntro() {
    this.moveFlag = false;
    await this.secondIntro();
    this.emit("enableControls");
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initialY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initialY - currentY;
    if (difference > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.initialY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("wheel", this.touchStart);
    window.removeEventListener("wheel", this.touchMove);
  }

  async playIntro() {
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("wheel", this.touchStart);
    window.addEventListener("wheel", this.touchMove);
  }

  move() {
    if (this.device === "desktop") {
      this.world.room.actualTarget.position.set(-1, 0, 0);
    } else {
      this.world.room.actualTarget.position.set(0, 0, -1);
    }
  }
  update() {
    if (this.moveFlag) {
      this.move();
    }
  }
}
