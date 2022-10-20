import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/all";
import Sizes from "../Utils/Sizes";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    // this.circle = this.experience.world.floor.circle;
    // this.circle2 = this.experience.world.floor.circle2;
    // this.circle3 = this.experience.world.floor.circle3;

    GSAP.registerPlugin(ScrollTrigger);

    document.querySelector(".page").style.overflow = "visible"; //maybe off with world off

    this.setSmoothScroll();
    //this.setPath();
  }

  setupASScroll() {
    const asscroll = new ASScroll({
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  setSmoothScroll() {
    this.asscrolll = this.setupASScroll();
  }

  setPath() {
    let mm = GSAP.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 969px)",
        isMobile: "(max-width: 968px)",
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;
        //desktop ##########################################################################################################
        //resets
        if (isDesktop) {
          this.room.scale.set(0.11, 0.11, 0.11);
          //first section <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          this.firstMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".first-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
          this.firstMoveTimeline.to(this.room.position, {
            x: () => {
              return this.sizes.width * 0.0014;
            },
          });

          //second section <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          this.secondMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".second-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
          this.secondMoveTimeline.to(
            this.room.position,
            {
              x: () => {
                return 1;
              },
              z: () => {
                return this.sizes.height * 0.0032;
              },
            },
            "same"
          );
          this.secondMoveTimeline.to(
            this.room.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4,
            },
            "same"
          );

          //third section <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
          this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
            y: 1.5,
            x: -4.1,
          });
        } else if (isMobile) {
          //mobile ###############################################################################################################

          //resets
          this.room.scale.set(0.07, 0.07, 0.07);
          this.room.position.set(0, 0, 0);
          //first section <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          this.firstMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".first-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }).to(this.room.scale, {
            x: 0.1,
            y: 0.1,
            z: 0.1,
          });

          //second section <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          this.secondMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".second-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        }

        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
          this.progressWrapper = section.querySelector(".progress-wrapper");
          this.progressBar = section.querySelector(".progress-bar");

          if (section.classList.contains("right")) {
            GSAP.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
            });

            GSAP.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          } else {
            GSAP.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
            });

            GSAP.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }

          //
          GSAP.from(this.progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              pin: this.progressWrapper,
              pinSpacing: false,
            },
          });

          //circles >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          this.firstMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".first-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }).to(this.circle.scale, {
            x: 3,
            y: 3,
            z: 3,
          });

          this.secondMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".second-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }).to(this.circle2.scale, {
            x: 3,
            y: 3,
            z: 3,
          });

          this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }).to(this.circle3.scale, {
            x: 3,
            y: 3,
            z: 3,
          });

          //
        });
      }
    );
  }

  resize() {}
  update() {}
}
