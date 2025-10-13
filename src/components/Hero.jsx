import React, { useEffect, useState } from "react";
import HeroSmall from "../assets/herosmall.png";
import Logo from "../assets/logo.png";

// Desktop slideshow images
import fitness1 from "../assets/fitness1.jpg";
import fitness2 from "../assets/fitness2.jpg";
import fitness3 from "../assets/fitness3.jpg";
import fitness4 from "../assets/fitness4.jpg";
import fitness5 from "../assets/fitness5.jpg";

const DESKTOP_SLIDES = [fitness1, fitness2, fitness3, fitness4, fitness5];
const SLIDE_MS = 5000; // 5s per slide
const SCROLL_OFFSET = 80;

const scrollToContact = () => {
  const el = document.getElementById("contact");
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
};

const Hero = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (DESKTOP_SLIDES.length <= 1) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % DESKTOP_SLIDES.length);
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative w-full">
      <div className="relative w-full h-[90vh] md:h-[80vh]">
        {/* Mobile background (single image) */}
        <img
          src={HeroSmall}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        />

        {/* Desktop slideshow */}
        <div className="absolute inset-0 hidden md:block">
          {DESKTOP_SLIDES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === idx ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div
          className="
            relative z-10 h-full
            flex flex-col justify-center
            items-center text-center
            md:items-center md:text-center md:px-16
            px-6 max-w-3xl mx-auto
          "
        >
          <img
            src={Logo}
            alt="Fifty Plus Fitness Logo"
            className="w-90 lg:w-[30rem] mb-4"
          />

          <p className="font-[Merriweather] text-2xl md:text-5xl mt-2 text-white">
            Personalized Fitness for Adults 50+
          </p>

          {/* Mobile-only CTA */}
          <button
            className="md:hidden mt-5 text-white px-6 py-3 rounded-md bg-transparent border border-white/60"
            onClick={scrollToContact}
          >
            Free Assessment
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
