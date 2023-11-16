let tween = gsap.to(".marquee__part", {
    xPercent: 100,
    repeat: -1,
    duration: 10,
    ease: "linear",
})
.totalProgress(0.5);

gsap.set(".marquee__inner", { xPercent: -50});