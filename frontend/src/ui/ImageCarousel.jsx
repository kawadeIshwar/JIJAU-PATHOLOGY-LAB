import React, { useState, useEffect } from 'react'
import image1 from '../assets/image13.jpg'
import image2 from '../assets/image3.png'
import image3 from '../assets/image4.png'
import image4 from '../assets/image99.png'

export default function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Home Sample Collection",
      subtitle: "Get Your Tests Done From The Comfort Of Your Home",
      description: "Our skilled phlebotomists visit your home with complete hygiene protocols",
      image: image1,
      buttonText: "Book Now",
      buttonLink: "#booking"
    },
    {
      id: 2,
      title: "Accurate Diagnostics",
      subtitle: "Trusted Lab Results You Can Rely On",
      description: "State-of-the-art equipment and certified technicians ensure accurate results",
      image: image2,
      buttonText: "View Tests",
      buttonLink: "/tests"
    },
    {
      id: 3,
      title: "Quick Reports",
      subtitle: "Fast Results Within 3-6 Hours",
      description: "Get your test reports online quickly and securely",
      image: image3,
      buttonText: "Learn More",
      buttonLink: "#features"
    },
    {
      id: 4,
      title: "Professional Service",
      subtitle: "Expert Care You Can Trust",
      description: "Certified professionals delivering exceptional healthcare services",
      image: image4,
      buttonText: "Get Started",
      buttonLink: "#booking"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 10000) // Change slide every 10 seconds

    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative w-full h-[250px] md:h-[320px] overflow-hidden rounded-2xl shadow-2xl bg-white">
        {/* Slides */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {/* <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 z-20"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
         */}
        {/* <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 z-20"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button> */}

        {/* Dots Indicator */}
        {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}

        {/* Progress Bar */}
        {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-20 z-20">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-100 ease-linear"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div> */}
    </div>
  )
}
