// HomePage.tsx
"use client";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const HomePage = () => {
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const introduceRef = useRef<HTMLDivElement>(null);
  const devRef = useRef<HTMLDivElement>(null);
  const additionalRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const animationContainer = animationContainerRef.current;
    const introduce = introduceRef.current;
    const dev = devRef.current;
    const additional = additionalRef.current;
    const img = imgRef.current;

    if (!animationContainer || !introduce || !dev || !additional || !img)
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: animationContainer,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });

    // Animate "Introduce" and "Dev" out
    tl.to(introduce, {
      x: -1000,
      opacity: 0,
      duration: 1,
      filter: "blur(10px)",
      ease: "power2.out",
    })
      .to(
        dev,
        {
          x: 1000,
          filter: "blur(10px)",
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "<" // Start at the same time as previous animation
      )
      .fromTo(
        img,
        { scale: 0, opacity: 0, y: 250, x: -1250 },
        { scale: 1, opacity: 0.2, duration: 1, ease: "power2.out", x: 0, y: 0 }
      )
      // Animate "Based In Tasikmalaya" in
      .fromTo(
        additional,
        { y: 200, opacity: 0, scale: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scale: 1,
          filter: "blur(0px)",
        },
        "+=0.1"
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      <section
        ref={animationContainerRef}
        className="relative flex flex-col justify-center items-center min-h-screen w-full bg-black bg-opacity-80 z-10 overflow-hidden"
      >
        {/* Introduce Text */}
        <div
          ref={introduceRef}
          className=" flex flex-col items-center justify-center"
        >
          <h1 className="text-5xl md:text-9xl text-white">
            Let Me Introduce Myself
          </h1>
        </div>

        {/* Dev Text */}
        <div
          ref={devRef}
          className=" flex flex-row items-center gap-x-10 justify-center mt-8"
        >
          <img
            src="images/img/akmal-biru.png"
            alt=""
            width={150}
            className="bg-white rounded-full hover:scale-110 transition-transform duration-500"
          />
          <h1 className="text-5xl md:text-9xl text-white">As Developer</h1>
          <img
            src="images/img/akmal-merah.png"
            alt=""
            width={150}
            className="bg-white rounded-full hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div
          ref={imgRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  -z-10"
        >
          <img
            src="images/img/basedcity.png"
            alt=""
            width={400}
            className="aspect-square rounded-full"
          />
        </div>

        {/* Additional Text */}
        <div
          ref={additionalRef}
          className="absolute flex flex-col items-center justify-center opacity-0"
        >
          <h1 className="text-5xl md:text-9xl text-white">Based In</h1>
          <h1 className="text-5xl md:text-9xl text-white">
            Tasikmalaya, West Java
          </h1>
        </div>
      </section>

      <section className="next-section min-h-screen bg-gray-900 flex items-center justify-center">
        <h2 className="text-4xl text-white">Welcome to the Next Section</h2>
      </section>
    </>
  );
};
