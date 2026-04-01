document.addEventListener("DOMContentLoaded", function () {
  const lottieAnimation = document.querySelector(".lottie-animation");
  const lottieEnd = document.querySelector(".lottie-end");

  gsap.registerPlugin(ScrollTrigger);

  const anim = lottie.loadAnimation({
    container: lottieAnimation,
    renderer: "svg",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    loop: false,
    autoplay: false,
    path: "./assets/animation.json",
  });

  anim.addEventListener("DOMLoaded", function () {
    const totalFrames = anim.totalFrames;

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      endTrigger: lottieEnd,
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        anim.goToAndStop(self.progress * (totalFrames - 1), true);
      },
    });
  });
});
