import React from "react";
import HeroImg from "../assets/bannerimg2.png";
import HeroSmall from "../assets/herosmall.png";
import Logo from "../assets/logo.png";

const SCROLL_OFFSET = 80;
const scrollToContact = () => {
  const el = document.getElementById("contact");
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
};

const Hero = () => {
  return (
    <section id="hero" className="relative w-full">
      <div className="relative w-full h-[90vh] md:h-[80vh]">
        {/* Background image (responsive swap) */}
        <img
          src={HeroSmall}
          alt="Elderly people exercising"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        />
        <img
          src={HeroImg}
          alt="Elderly people exercising"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
        />

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
          {/* Logo replaces text */}
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
