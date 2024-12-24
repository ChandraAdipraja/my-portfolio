import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import gsap from "gsap";
import router from "next/router";

const menu = [
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Project",
    link: "/project",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const container = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const timelineOpen = useRef(gsap.timeline({ paused: true }));
  const timelineClose = useRef(gsap.timeline({ paused: true }));

  const overlayRef = useRef(null);

  useEffect(() => {
    if (overlayRef.current) {
      // Set initial state for the overlay element

      timelineOpen.current
        .clear()
        .set(overlayRef.current, {
          pointerEvents: "none",
          visibility: "hidden",
          opacity: 0,
          y: "-100%", // Position it off-screen
        })
        .to(overlayRef.current, {
          duration: 1,
          y: 0,
          opacity: 1,
          visibility: "visible",
          pointerEvents: "auto", // Enable interaction when menu opens
          ease: "power3.inOut",
        })
        .fromTo(
          ".menu-logo",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".menu-bar div",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
        )
        .fromTo(
          ".menu-other div",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.2 }
        );

      timelineClose.current.clear().to(overlayRef.current, {
        duration: 0.8,
        y: "100%", // Move menu down
        opacity: 1,
        pointerEvents: "none",
        ease: "power3.inOut",
        onComplete: () => {
          console.log("Menu closed");
        },
      });
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      timelineClose.current.pause(0); // Reset close timeline
      timelineOpen.current.play(); // Play opening animation
      timelineOpen.current.restart();
    } else {
      timelineOpen.current.pause(); // Pause open timeline
      timelineClose.current.play(); // Play closing animation from the beginning
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (isMenuOpen) {
        timelineClose.current.play(); // Play close animation
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [isMenuOpen, router.events]);

  return (
    <div
      className="relative flex h-full min-h-screen w-full flex-col"
      ref={container}
    >
      <header className="fixed  w-full py-4 lg:py-6 lg:px-12 px-4 text-white dark:bg-darkBg bg-transparent z-50">
        <nav className="w-full flex items-center justify-between">
          <h1 className="text-lg font-bold text-secondaryBlack text-purple-600 ">
            Chandra Adipraja
          </h1>

          <div className="menu-open" onClick={toggleMenu}>
            <h1 className="text-lg font-bold text-purple-600 cursor-pointer">
              Menu
            </h1>
          </div>
        </nav>
        <div
          className="bg-white text-black w-full fixed top-0 left-0 h-full z-40"
          ref={overlayRef}
        >
          <div className="menu-logo flex justify-between py-4 px-12 items-center border-b-4 border-gray-950">
            <Link href={"/"}>
              <h1 className="text-4xl">Chandra Adipraja</h1>
            </Link>
            <div className="" onClick={toggleMenu}>
              <IoCloseOutline className="font-semibold cursor-pointer text-4xl" />
            </div>
          </div>
          <div className="menu-bar flex flex-col items-start px-7 mt-14">
            {menu.map((item, index) => (
              <div className="p-4" key={index}>
                <Link
                  href={item.link}
                  className="text-black text-9xl font-thin"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="menu-other fixed left-0 bottom-0 flex flex-row gap-x-20 px-12 py-6 rounded-tr-2xl">
            <div className="bg-gray-900 flex flex-row gap-x-20 p-4 rounded ">
              <div className="text-5xl text-white cursor-pointer">
                <FaGithub />
              </div>
              <div className="text-5xl text-white cursor-pointer">
                <AiOutlineInstagram />
              </div>
              <div className="text-5xl text-white cursor-pointer">
                <MdOutlineEmail />
              </div>
              <div className="text-5xl text-white cursor-pointer">
                <FaXTwitter />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative w-full mx-auto min-h-screen flex-grow dark:bg-darkBg dark:text-white">
        {children}
      </main>
    </div>
  );
};

export default PageContainer;
