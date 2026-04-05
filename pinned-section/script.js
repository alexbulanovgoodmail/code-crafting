document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const sections = document.querySelectorAll("section");

  gsap.set("main", { opacity: 1 });
  gsap.set(".footer", { opacity: 1 });

  sections.forEach((section, index) => {
    const container = section.querySelector(".container");

    gsap.to(container, {
      rotation: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top 20%",
        scrub: true,
      },
    });

    if (index === sections.length - 1) return;

    ScrollTrigger.create({
      trigger: section,
      start: "bottom bottom",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });
  });
});
