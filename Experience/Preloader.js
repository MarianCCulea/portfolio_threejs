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
          .to(
            this.cvChildren.picture_frame.scale,
            {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.7,
              ease: "back.out(2.5)",
            },
            "<"
          )
          .to(this.cv.position, {
            x: 0,
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
            x: -2,
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
        .to(this.cv.position, {
          z: -1.65,
          y: -0.6,
          duration: 1.3,
          ease: "power3.out",
        })

        .to(this.cvChildren.main_side.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: "power3.out",
        })
        .to(this.cvChildren.left_side.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: "power3.out",
        })
        .to(
          this.cvChildren.text1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "<"
        )
        .to(this.cvChildren.sphere1.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.2,
          ease: "back.out(1.4)",
        })
        .to(this.cvChildren.sphere2.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.2,
          ease: "back.out(1.7)",
        })
        .to(this.cvChildren.sphere3.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.2,
          ease: "back.out(1.7)",
        })
        //*********************************************** */
        .to(
          this.cvChildren.sphere4.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.2,
            ease: "back.out(1.7)",
          },
          "mata"
        )
        .to(this.cvChildren.sphere5.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        })
        .to(this.cvChildren.sphere6.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        })
        .to(this.cvChildren.sphere7.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.2,
          ease: "back.out(1.7)",
        })
        .to(
          this.cvChildren.text3.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "mata"
        )
        .to(
          this.cvChildren.progressbase1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.text4.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progress1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progressbase2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        ///////////
        .to(
          this.cvChildren.text5.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progress2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progressbase3.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )

        /////////
        .to(
          this.cvChildren.text6.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progress3.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progressbase4.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )

        /////////
        .to(
          this.cvChildren.text7.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progress4.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progressbase5.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        //////////////

        .to(
          this.cvChildren.text8.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progress5.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progressbase6.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        ////////
        .to(
          this.cvChildren.text9.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progress6.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progressbase7.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.progress7.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.text2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.2,
            ease: "back.out(1.9)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.hob1.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: "back.out(1.8)",
          },
          "<0.3"
        )
        .to(
          this.cvChildren.hob2.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "<0.2"
        )
        .to(
          this.cvChildren.hob3.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "<0.4"
        )
        .to(
          this.cvChildren.hob4.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: "back.out(1.8)",
          },
          "<0.6"
        )
        .to(
          this.cvChildren.hob5.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "<0.2"
        );

      this.secondTimeline

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
    this.emit("enablecontrols");
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
      // this.move();
    }
  }
}
