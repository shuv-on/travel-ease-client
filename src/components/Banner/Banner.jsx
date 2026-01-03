import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop",
    title: "Welcome to TravelEase",
    desc: "Find your perfect ride, effortlessly. Book from thousands of vehicles near you."
  },
  {
    id: 2,
    image: "https://media.wheelscene.com/wp-content/uploads/2018/09/13C665_004-880x503.jpg",
    title: "Luxury & Comfort",
    desc: "Experience the ultimate comfort with our premium selection of luxury cars."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1920&auto=format&fit=crop",
    title: "Adventure Awaits",
    desc: "Rent an SUV or Off-road vehicle and explore the unseen paths today."
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden group">
     
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="max-w-2xl text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg transition-all duration-500 transform translate-y-0">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
            {slides[currentSlide].desc}
          </p>
          <Link to="/allvehicles" className="btn btn-primary btn-lg border-none bg-green-500 hover:bg-green-600 text-white gap-2 mt-4">
             Explore Now <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8">
        <button onClick={prevSlide} className="btn btn-circle btn-ghost text-white hover:bg-white/20">
          <FaChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8">
        <button onClick={nextSlide} className="btn btn-circle btn-ghost text-white hover:bg-white/20">
          <FaChevronRight size={24} />
        </button>
      </div>

 
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-green-500 w-8' : 'bg-white/50'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;