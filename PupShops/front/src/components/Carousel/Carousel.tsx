"use client";

import { useState, useEffect } from "react";

const images = ["/1.png", "/2.png"];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden mt-[75px]">
      <div
        className="flex transition-transform ease-in-out duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto max-h-[calc(100vh-var(--navbar-height,0px))] object-contain"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300 text-sm sm:text-base z-10"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300 text-sm sm:text-base z-10"
      >
        ❯
      </button>

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-colors duration-300 ${
              index === currentIndex ? "bg-purple-600" : "bg-pink-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
