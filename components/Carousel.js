// Carousel.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { slides } from "@/datas/slidesdata";

const Carousel = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageSlideClass, setImageSlideClass] = useState(
    "translate-x-0 opacity-100"
  );
  const [infoSlideClass, setInfoSlideClass] = useState(
    "translate-x-0 opacity-100"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setImageSlideClass("translate-x-full opacity-0");
      setInfoSlideClass("-translate-x-full opacity-0");

      setTimeout(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setImageSlideClass("translate-x-0 opacity-100");
        setInfoSlideClass("translate-x-0 opacity-100");
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleButtonClick = (link) => {
    router.push(link);
  };

  return (
    <div id="custom-carousel" className="relative w-full">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="md:w-1/2">
          <div
            className={`transform transition-transform duration-500 pr-3 ${infoSlideClass}`}
          >
            <div className="text-red-600 mb-2 font-bold">
              <div className="flex items-center mb-md-4 mb-2">
                <hr className="w-20 mr-4" />
                <span>{slides[currentSlide].saleInfo}</span>
              </div>
            </div>
            <h1 className="carousel-titlee font-bold mb-4">
              {slides[currentSlide].title}
            </h1>

            <div className="pt-md-5 pt-2">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleButtonClick(slides[currentSlide].link)}
                target="_blank"
              >
                {slides[currentSlide].buttonText}
              </button>
            </div>
            <hr className="w-full mt-5" />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-2/5 ml-auto relative h-56 md:h-96">
          <img
            src={slides[currentSlide].imageUrl}
            alt="Property"
            className={`relative carousel-img rounded-lg object-cover transition-transform duration-500 ${imageSlideClass}`}
          />
          <div
            className={`absolute md:bottom-[-40px] md:left-[-120px] bg-black bg-opacity-5 text-white p-4 rounded-lg w-auto ${infoSlideClass}
            bottom-[-260px] left-0 `}
          >
            <div className="transform transition-transform duration-500">
              <div className="text-2xl font-bold mb-2">
                {slides[currentSlide].price}
              </div>
              <div className="text-sm">{slides[currentSlide].location}</div>

              <div className="grid grid-cols-3 gap-3 text-xs pt-3">
                <div>
                  <p className="font-semibold mb-0">Type:</p>
                  <p>{slides[currentSlide].type}</p>
                </div>

                <div>
                  <p className="font-semibold mb-0">Occupancy:</p>
                  <p>{slides[currentSlide].occupancy}</p>
                </div>
                <div>
                  <p className="font-semibold mb-0">Approximate Size (SqFt):</p>
                  <p>{slides[currentSlide].size}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={() => {
              setImageSlideClass("translate-x-full opacity-0");
              setInfoSlideClass("translate-x-full opacity-0");
              setTimeout(() => {
                setCurrentSlide((prev) =>
                  prev === 0 ? slides.length - 1 : prev - 1
                );
                setImageSlideClass("translate-x-0 opacity-100");
                setInfoSlideClass("translate-x-0 opacity-100");
              }, 500);
            }}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg
                className="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1L1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={() => {
              setImageSlideClass("translate-x-full opacity-0");
              setInfoSlideClass("translate-x-full opacity-0");
              setTimeout(() => {
                setCurrentSlide((prev) =>
                  prev === slides.length - 1 ? 0 : prev + 1
                );
                setImageSlideClass("translate-x-0 opacity-100");
                setInfoSlideClass("translate-x-0 opacity-100");
              }, 500);
            }}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg
                className="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 9l4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
