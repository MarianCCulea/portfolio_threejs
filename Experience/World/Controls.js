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
    this.cv = this.experience.world.cv.cv;
    this.cvChildren = this.experience.world.cv.cvChildren;
    this.floaters = this.experience.world.floaters;
    this.phone = this.experience.world.phone.phone;
    this.screen = this.experience.world.screen.screen;
    this.circle = this.experience.world.floor.circle;
    this.circle2 = this.experience.world.floor.circle2;
    this.circle3 = this.experience.world.floor.circle3;
    this.circle4 = this.experience.world.floor.circle4;

    GSAP.registerPlugin(ScrollTrigger);

    document.querySelector(".page").style.overflow = "visible"; //maybe off with world off

    this.setSmoothScroll();
    this.setPath();
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
          //first section <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          this.firstMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".first-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              //markers: true,
              invalidateOnRefresh: true,
            },
          });
          this.firstMoveTimeline
            .to(
              this.cv.position,
              {
                x: 0.3,
                y: 3,
                z: 5,
              },
              "trigger"
            )
            .to(
              this.floaters.particlesMesh.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "trigger"
            )
            .to(
              this.floaters.particlesMesh.material,
              { opacity: 0 },
              "trigger"
            );

          this.secondMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".first-section",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              //markers: true,
              invalidateOnRefresh: true,
            },
          }).to(this.cv.position, {
            x: 0.3,
            y: 4,
            z: 3,
          });

          this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".second-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }).to(
            this.cv.position,
            {
              x: 0,
              y: 3,
              z: 5,
            },
            "same"
          );

          this.forthMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".second-section",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              // markers: true,
              invalidateOnRefresh: true,
            },
          }).to(this.cv.position, {
            x: 0,
            y: 4,
            z: 3,
          });

          this.fifthMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
            .to(
              this.cv.position,
              {
                x: 0,
                z: 1.98,
                y: 0.726,
              },
              "trigger"
            )
            .to(
              this.cv.scale,
              {
                x: 0.8,
                z: 0.8,
                y: 0.8,
              },
              "trigger"
            )
            .to(
              this.circle4.scale,
              {
                x: 3,
                y: 3,
                z: 3,
              },
              "trigger"
            )
            .to(
              this.floaters.particlesMesh.material,
              { opacity: 0.9 },
              "trigger"
            )
            //   ;
            // this.sixMoveTimeline = new GSAP.timeline({
            //   scrollTrigger: {
            //     trigger: ".forth-move",
            //     start: "top top",
            //     end: "bottom bottom",
            //     scrub: 0.8,
            //     invalidateOnRefresh: true,
            //   },
            // })
            .to(
              this.cvChildren.hob5.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "hobbies"
            )
            .to(
              this.cvChildren.hob4.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "hobbies"
            )
            .to(
              this.cvChildren.hob3.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "hobbies"
            )
            .to(
              this.cvChildren.hob2.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "hobbies"
            )
            .to(
              this.cvChildren.hob1.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "hobbies"
            )
            .to(
              this.cvChildren.text2.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "hobbies"
            )
            .to(
              this.cvChildren.progress7.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progressbase7.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progress6.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.text8.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progressbase6.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progress5.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.text9.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progressbase5.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progress4.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.text7.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progressbase4.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progress3.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.text6.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progressbase3.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progress2.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.text5.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progressbase2.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progress1.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.text4.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.progressbase1.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.text3.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.sphere7.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.sphere6.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.sphere5.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.sphere4.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.sphere3.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.sphere2.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.sphere1.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(
              this.cvChildren.text1.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "progress"
            )
            .to(this.cvChildren.left_side.scale, {
              x: 0,
              y: 0,
              z: 0,
            })
            .to(this.cvChildren.main_side.scale, {
              x: 0,
              y: 0,
              z: 0,
            })
            .to(this.cvChildren.picture.scale, {
              x: 0,
              y: 0,
              z: 0,
            })
            .to(
              this.cvChildren.picture_frame.scale,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              "<"
            );
          /////////////////////////////////
          this.seventhMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".forth-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
            .to(this.phone.scale, {
              x: 0.2,
              y: 0.2,
              z: 0.2,
            })
            .to(this.screen.scale, {
              x: 0.8,
              y: 0.8,
              z: 0.8,
            });

          this.eithMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".fifth-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
            .to(this.phone.scale, {
              x: 0,
              y: 0,
              z: 0,
            })
            .to(this.screen.scale, {
              x: 0,
              y: 0,
              z: 0,
            })
            .to(this.cv.position, {
              x: -1,
              y: 2,
              z: 3,
            })
            .to(this.cvChildren.picture.scale, {
              x: 1,
              y: 1,
              z: 1,
            })
            .to(
              this.cvChildren.picture_frame.scale,
              {
                x: 1,
                y: 1,
                z: 1,
              },
              "<"
            );
          // //third section <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          // this.thirdMoveTimeline = new GSAP.timeline({
          //   scrollTrigger: {
          //     trigger: ".third-move",
          //     start: "top top",
          //     end: "bottom bottom",
          //     scrub: 0.6,
          //     invalidateOnRefresh: true,
          //   },
          // });
          // this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
          //   y: 1.5,
          //   x: -4.1,
          // });
        } else if (isMobile) {
          // //mobile ###############################################################################################################
          // //resets
          // this.room.scale.set(0.07, 0.07, 0.07);
          // this.room.position.set(0, 0, 0);
          // //first section <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          // this.firstMoveTimeline = new GSAP.timeline({
          //   scrollTrigger: {
          //     trigger: ".first-move",
          //     start: "top top",
          //     end: "bottom bottom",
          //     scrub: 0.6,
          //     invalidateOnRefresh: true,
          //   },
          // }).to(this.room.scale, {
          //   x: 0.1,
          //   y: 0.1,
          //   z: 0.1,
          // });
          // //second section <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          // this.secondMoveTimeline = new GSAP.timeline({
          //   scrollTrigger: {
          //     trigger: ".second-move",
          //     start: "top top",
          //     end: "bottom bottom",
          //     scrub: 0.6,
          //     invalidateOnRefresh: true,
          //   },
          // });
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
  resize() {}
  update() {}
}
