"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Welcome } from "./Welcome";

gsap.registerPlugin(ScrollTrigger);

export default function SvgAnimation() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svgContainer = svgContainerRef.current;

    if (!path || !svgContainer) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgContainer,
        start: "top top",
        end: "+=200%",
        pin: true, // Pin the section
        scrub: true, // Smoothly connect scroll to timeline
        anticipatePin: 1, // Avoid jumpiness
        markers: true, // Debug markers
      },
    });

    // Animate SVG stroke
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2, // Control the speed of animation
      ease: "power2.out",
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div>
      <section
        ref={svgContainerRef}
        className="relative min-h-screen w-screen flex items-center justify-center bg-gray-900 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-screen h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-50 -50 300 200"
            width="100%"
            height="100%"
          >
            <path
              ref={pathRef}
              d="M -120 14 C -136 -15 195 -1 208 16 C 223 54 -19 96 -114 23 C -149 -9 223 -22 213 18 C 218 43 118 79 38 37 V 103 C 14 93 19 81 59 99"
              stroke="white"
              fill="transparent"
              strokeWidth="2"
              transform="translate(50, 30)"
            />
          </svg>
        </div>
        <div className="relative z-10">
          <h1 className="font-semibold text-6xl text-white">
            A Journey Through Code and Creativity
          </h1>
        </div>
      </section>

      <section className="relative next-section min-h-screen flex items-center justify-center bg-white">
        <Welcome />
      </section>
    </div>
  );
}
