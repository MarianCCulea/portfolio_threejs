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

    this.cv = this.experience.world.cv.cv;
    this.cvChildren = this.experience.world.cv.cvChildren;
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animate", { y: 0, yPercent: 100 });
      this.timeline.to(".preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });
      if (this.device === "desktop") {
        this.timeline
          .to(this.cvChildren.picture.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.cv.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      } else {
        this.timeline
          .to(this.cvChildren.picture.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.cv.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      }
      this.timeline
        .to(".intro-text .animate", {
          yPercent: 0,
          stagger: 0.07,
          ease: "back.out(1.2)",
        })
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 1,
          },
          "same"
        )
        .to(
          ".toggle-bar",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "same"
        );
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();
      console.log(this.cvChildren);
      for (const child in this.cvChildren) {
        console.log(this.cvChildren[child]);
        this.secondTimeline.to(this.cvChildren[child].scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 1,
        });
      }

      this.secondTimeline
        .to(
          ".intro-text .animate",
          {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(1.7)",
          },
          "fadeout"
        )
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 0,
          },
          "fadeout"
        )
        .to(
          ".hero-main-title .animate",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introtext"
        )
        .to(
          ".hero-main-description .animate",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introtext"
        )
        .to(
          ".firstsb .animate",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introtext"
        )
        .to(
          ".secondsb .animate",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introtext"
        )
        .to(".arrow-svg-wrapper", {
          opacity: 1,
          onComplete: resolve,
        });

      if (this.device === "desktop") {
      } else {
      }
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initalY - currentY;
    if (difference > 0) {
      console.log("swipped up");
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.intialY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    this.scaleFlag = true;
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }

  async playSecondIntro() {
    this.moveFlag = false;
    await this.secondIntro();
    this.scaleFlag = false;
    this.emit("enableControls");
  }

  move() {
    if (this.device === "desktop") {
      this.world.cv.cv.position.set(0, 0, 0);
    } else {
      this.world.cv.cv.position.set(0, 0, 0);
    }
  }
  update() {
    if (this.moveFlag) {
      this.move();
    }
  }
}
