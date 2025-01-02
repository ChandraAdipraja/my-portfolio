"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Welcome = () => {
  const overlayLeftRef = useRef<HTMLDivElement | null>(null);
  const overlayRightRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlayLeft = overlayLeftRef.current;
    const overlayRight = overlayRightRef.current;
    const content = contentRef.current;

    if (!overlayLeft || !overlayRight || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: content, // Trigger animasi pada konten
        start: "center center", // Mulai animasi saat konten berada di tengah viewport
        end: "+=300", // Animasi selesai saat bagian bawah konten melewati bagian atas viewport
        scrub: true, // Menghubungkan animasi dengan scroll
        pin: true, // Pin konten agar tetap di tempat selama animasi
        anticipatePin: 1, // Menghindari lompat saat pin
        markers: true, // Optional: untuk debugging
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <h1>Ini Nanti Splash Screen Ke Atas Dan Bawah</h1>
    </section>
  );
};
