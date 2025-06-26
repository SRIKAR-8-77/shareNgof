import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // using lucide icons

import slide1 from "../assets/images/rentcar.jpeg";
import slide2 from "../assets/images/sharenow.png";
import slide3 from "../assets/images/travelpoll.png";
import slide4 from "../assets/images/service.jpeg";

const images = [slide1, slide2, slide3, slide4];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 300);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setFade(true);
    }, 300);
  };

  const goToSlide = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 300);
  };

  const getPrevIndex = () => (currentIndex - 1 + images.length) % images.length;
  const getNextIndex = () => (currentIndex + 1) % images.length;

  return (
    <div className="relative w-full h-[75vh] flex flex-col items-center justify-center">
      <div className="relative w-[90%] flex justify-center items-center h-full mx-auto">
        {/* Previous image */}
        <img
          src={images[getPrevIndex()]}
          alt="prev"
          className={`absolute left-0 w-[20%] h-[80%] object-cover rounded-xl opacity-40 blur-sm transition-all duration-700 ease-in-out ${
            fade ? "opacity-40" : "opacity-0"
          }`}
        />

        {/* Main image */}
        <img
          src={images[currentIndex]}
          alt="main"
          className={`w-[55%] h-[85%] object-cover rounded-2xl shadow-xl transition-opacity duration-1000 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Next image */}
        <img
          src={images[getNextIndex()]}
          alt="next"
          className={`absolute right-0 w-[20%] h-[80%] object-cover rounded-xl opacity-40 blur-sm transition-all duration-700 ease-in-out ${
            fade ? "opacity-40" : "opacity-0"
          }`}
        />

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-5 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-5 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-black scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
