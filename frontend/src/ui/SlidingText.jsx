import React, { useState, useEffect } from 'react'

export default function SlidingText() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Home Sample Collection",
      subtitle: "Get Your Tests Done From The Comfort Of Your Home",
      description: "Our skilled phlebotomists visit your home with complete hygiene protocols",
      buttonText: "Book Now",
      buttonLink: "#booking"
    },
    {
      id: 2,
      title: "Accurate Diagnostics",
      subtitle: "Trusted Lab Results You Can Rely On",
      description: "State-of-the-art equipment and certified technicians ensure accurate results",
      buttonText: "View Tests",
      buttonLink: "/tests"
    },
    {
      id: 3,
      title: "Quick Reports",
      subtitle: "Fast Results Within 6 Hours",
      description: "Get your test reports online quickly and securely",
      buttonText: "Learn More",
      buttonLink: "#features"
    },
    {
      id: 4,
      title: "Professional Service",
      subtitle: "Expert Care You Can Trust",
      description: "Certified professionals delivering exceptional healthcare services",
      buttonText: "Get Started",
      buttonLink: "#booking"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative w-full h-[250px] md:h-[320px] flex items-center justify-center">
      {/* Text Content */}
      <div className="text-center text-gray-700 px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in">
          {slides[currentSlide].title}
        </h2>
        <h3 className="text-lg md:text-xl mb-4 text-gray-600 animate-fade-in-delay">
          {slides[currentSlide].subtitle}
        </h3>
        <p className="text-base md:text-lg mb-6 text-gray-500 animate-fade-in-delay-2">
          {slides[currentSlide].description}
        </p>
        <button 
          onClick={() => {
            if (slides[currentSlide].buttonLink.startsWith('#')) {
              document.querySelector(slides[currentSlide].buttonLink)?.scrollIntoView({ behavior: 'smooth' })
            } else {
              window.location.href = slides[currentSlide].buttonLink
            }
          }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-fade-in-delay-3 shadow-xl"
        >
          {slides[currentSlide].buttonText}
        </button>
      </div>
    </div>
  )
}
