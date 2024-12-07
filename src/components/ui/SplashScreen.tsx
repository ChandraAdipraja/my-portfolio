import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "front-end developer",
  "creative designer",
  "content creator",
  "chandra adipraja",
];

const gifts = ["rocket.gif", "design.gif", "game.gif", "arrow.gif"];

export default function SplashScreen() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000); // Ganti setiap 3 detik
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 110); // Update progress setiap 80ms untuk mencapai 100% dalam 8 detik
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsVisible(false);
      }, 500); // Delay to allow the exit animation to complete
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="bg-gray-50  flex items-center justify-center fixed top-0 left-0 w-full h-full z-50 overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "100%", transition: { delay: 2, duration: 0.5 } }}
          transition={{ duration: 4 }}
        >
          <motion.div
            className="flex flex-col lg:flex-row items-center text-xl lg:text-4xl font-semibold lg:mr-48"
            initial={{ opacity: 0, scale: 0 }} // Muncul dengan opacity 0
            animate={{ opacity: 1, scale: 1 }} // Muncul dengan opacity 1
            transition={{ duration: 1 }}
          >
            {/* Teks "I'm" tetap diam */}
            <motion.span
              className="mr-2 text-gray-600"
              initial={{ opacity: 0, scale: 0, y: 100 }} // Muncul dengan opacity 0
              animate={{ opacity: 1, scale: 1, y: 0 }} // Muncul dengan opacity 1
              transition={{ duration: 0.3 }}
            >
              I'M
            </motion.span>

            {/* Roles dan Gifts dengan animasi */}
            <div className="relative flex flex-col   lg:flex-row my-auto items-center min-w-[200px] lg:min-w-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roles[index]} // Kunci unik untuk teks dan gambar
                  initial={{ y: 100, opacity: 0 }} // Muncul dari bawah dengan opacity 0
                  animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }} // Ke posisi tengah dengan opacity 1
                  exit={{ y: -100, opacity: 0, transition: { duration: 0.3 } }} // Keluar ke atas dengan opacity 0
                  transition={{ duration: 1 }}
                  className="flex items-center absolute"
                >
                  <span className="text-gray-600 uppercase whitespace-nowrap">
                    {roles[index]}
                  </span>
                  <img
                    src={`/images/gifts/${gifts[index]}`} // Path ke gambar
                    alt="Gift"
                    className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] ml-2 object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="fixed bottom-0 left-0 w-full overflow-hidden">
            <motion.div
              className="flex justify-center mb-1 text-gray-600 font-semibold p-5"
              initial={{ scale: 1 }}
              animate={{ scale: 1 + progress / 100 }}
              transition={{ duration: 0.1 }}
            >
              {progress}%
            </motion.div>
            <div className="w-full h-2 bg-gray-200">
              <motion.div
                className="h-full bg-gray-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.11 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
