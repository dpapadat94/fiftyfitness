import React, { useEffect, useRef, useState } from "react";
import Laptop from "../assets/laptop.png";
import Group from "../assets/group.png";
import Weight from "../assets/weight.png";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const SERVICES = [
  {
    id: 1,
    title: "Personal Training",
    img: Weight,
    desc: "One-on-one personal coaching offers a fully customized fitness experience tailored to your goals, fitness level, and lifestyle. Choose from 30, 45, or 60-minute sessions, each designed to maximize your results with focused, expert guidance. Whether you're new to exercise or looking to take your fitness to the next level, personalized training ensures every minute counts.",
  },
  {
    id: 2,
    title: "Small Group Classes",
    img: Group,
    desc: "Small group personal coaching combines personalized coaching with the motivation of working out alongside friends or family. You can create your own group of 2–4 people, making it a fun and supportive way to reach your goals together. Sessions are available in 45 or 60-minute formats and tailored to the needs of your group.",
  },
  {
    id: 3,
    title: "At-Home Programs",
    img: Laptop,
    desc: "Virtual personal coaching brings customized workouts and expert coaching directly to you—anytime, anywhere. Sessions are held live via video, offering real-time feedback, motivation, and accountability. Choose from 30, 45, or 60-minute options to fit your schedule and goals without compromising on quality or results.",
  },
];

function splitInHalf(text) {
  const mid = Math.floor(text.length / 2);
  const splitAt = text.indexOf(" ", mid) !== -1 ? text.indexOf(" ", mid) : mid;
  return [text.slice(0, splitAt).trim(), text.slice(splitAt).trim()];
}

const ServiceCard = ({
  title,
  img,
  desc,
  expanded,
  setExpanded,
  isActive,
  isDimmed,
}) => {
  const [first, second] = splitInHalf(desc);

  return (
    <article
      className={`
        relative rounded-2xl overflow-hidden transition-transform duration-300 origin-center
        bg-[#38b6ff]
        scale-95 text-center
        ${isActive ? "scale-100 lg:scale-105 shadow-xl z-10 bg-[#89c9ee]" : ""}
        ${isDimmed ? "scale-[0.90] opacity-80" : ""}
        w-72
      `}
    >
      {img ? (
        <div className="flex items-center justify-center h-32">
          <img
            src={img}
            alt=""
            className="max-h-full max-w-full object-contain object-center"
            loading="lazy"
          />
        </div>
      ) : null}

      <div className="px-4 pb-4 pt-2">
        <h3 className="text-lg md:text-xl text-white font-semibold">{title}</h3>
        <p className="mt-2 text-white leading-relaxed">
          {first}
          {!expanded && second ? (
            <>
              …{" "}
              <button
                onClick={setExpanded}
                className="inline text-white underline font-bold p-0 m-0 border-none bg-transparent hover:bg-transparent focus:outline-none"
              >
                See more
              </button>
            </>
          ) : null}

          {expanded && second ? (
            <>
              {" "}
              {second}{" "}
              <button
                onClick={setExpanded}
                className="inline text-gray-200 p-2 m-0 border-none bg-transparent hover:bg-transparent focus:outline-none"
              >
                See less
              </button>
            </>
          ) : null}
        </p>
      </div>
    </article>
  );
};

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  /** ---------- MOBILE: Bounded carousel (no loop) ---------- */
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // 0 .. SERVICES.length-1

  // Center current slide on resize
  useEffect(() => {
    const onResize = () => {
      const el = trackRef.current;
      if (!el) return;
      el.scrollTo({ left: activeIndex * el.clientWidth, behavior: "auto" });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);

  const scrollToIndex = (idx, behavior = "smooth") => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(SERVICES.length - 1, idx));
    el.scrollTo({ left: clamped * el.clientWidth, behavior });
    setActiveIndex(clamped);
    setExpandedIndex(null);
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== activeIndex) setActiveIndex(idx);
  };

  const goPrev = () => scrollToIndex(activeIndex - 1);
  const goNext = () => scrollToIndex(activeIndex + 1);

  /** ---------- DESKTOP/TABLET: hover grow/highlight ---------- */
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" className="relative w-full py-8 bg-[#38b6ff]">
      {/* Mobile-only header */}
      <h2 className="md:hidden text-white text-3xl font-bold text-center mb-4">
        Services
      </h2>

      {/* MOBILE: Bounded carousel */}
      <div className="md:hidden relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="
            flex overflow-x-auto w-screen
            snap-x snap-mandatory scroll-smooth
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          "
          style={{ scrollSnapType: "x mandatory" }}
        >
          {SERVICES.map((s, idx) => (
            <div
              key={s.id}
              className="snap-center shrink-0 w-screen flex items-start justify-center"
            >
              <div className="pt-1">
                <ServiceCard
                  {...s}
                  expanded={expandedIndex === idx}
                  setExpanded={() =>
                    setExpandedIndex((prev) => (prev === idx ? null : idx))
                  }
                  isActive={activeIndex === idx}
                  isDimmed={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Left arrow (always visible on first card but disabled) */}
        <button
          aria-label="Previous"
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-1 backdrop-blur
            ${
              activeIndex === 0
                ? "bg-white/50 opacity-60 pointer-events-none"
                : "bg-white/80 active:scale-95"
            }
          `}
          onClick={goPrev}
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>

        {/* Right arrow: hide on last card */}
        {activeIndex < SERVICES.length - 1 && (
          <button
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-1 active:scale-95"
            onClick={goNext}
          >
            <ChevronRightIcon className="w-6 h-6 text-black" />
          </button>
        )}
      </div>

      {/* DESKTOP/TABLET: Original grid with hover grow/highlight */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
            {SERVICES.map((s, index) => (
              <div
                key={s.id}
                className="transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ServiceCard
                  {...s}
                  expanded={expandedIndex === index}
                  setExpanded={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  isActive={hoveredIndex === index}
                  isDimmed={hoveredIndex !== null && hoveredIndex !== index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
