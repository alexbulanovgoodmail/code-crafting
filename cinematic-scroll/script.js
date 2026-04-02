document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll(".clip-title").forEach((el) => {
    el.style.background = el.dataset.bg;
    el.style.color = el.dataset.color;
  });

  const revealTl = gsap.timeline({
    delay: 1,
    scrollTrigger: {
      trigger: ".benefit-section",
      start: "top 55%",
      end: "top -10%",
      scrub: 1.5,
    },
  });

  const split = new SplitText(".paragraph-animation", {
    type: "lines,words",
    linesClass: "line",
    wordsClass: "word",
  });

  function reveal() {
    return {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
      ease: "circ.out",
    };
  }

  revealTl
    .from(split.words, {
      stagger: 0.2,
      opacity: 0,
      rotate: 6,
      yPercent: 30,
      ease: "power1.inOut",
    })
    .to(".first-title", reveal())
    .to(".second-title", reveal())
    .to(".third-title", reveal())
    .to(".fourth-title", reveal());

  const mm = gsap.matchMedia();

  mm.add("(min-width:768px)", () => {
    const vpTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".video-wrapper",
        start: "top top",
        end: "+=2500",
        scrub: 1.5,
        pin: true,
      },
    });

    vpTl.fromTo(
      ".video-box",
      { clipPath: "circle(8% at 50% 50%)" },
      { clipPath: "circle(100% at 50% 50%)", ease: "none" },
    );
  });
});
