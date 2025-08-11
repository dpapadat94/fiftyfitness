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
        ${isActive ? "scale-100 shadow-xl z-10 bg-[#89c9ee]" : ""}
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

  // ====== MOBILE INFINITE CAROUSEL ======
  // Build looped slides: [last, ...SERVICES, first]
  const slides = [SERVICES[SERVICES.length - 1], ...SERVICES, SERVICES[0]];
  const trackRef = useRef(null);
  const [loopIndex, setLoopIndex] = useState(1); // start on first real slide
  const [activeRealIndex, setActiveRealIndex] = useState(0); // 0..SERVICES.length-1

  // Helper: scroll to a loopIndex (index in `slides`)
  const scrollToLoopIndex = (idx, behavior = "smooth") => {
    const el = trackRef.current;
    if (!el) return;
    const viewport = el.clientWidth; // each slide is 100vw of the track
    el.scrollTo({ left: idx * viewport, behavior });
  };

  // Init to real first slide
  useEffect(() => {
    // Without animation so it doesn't flash
    scrollToLoopIndex(1, "auto");
  }, []);

  // Keep current slide centered on resize
  useEffect(() => {
    const onResize = () => {
      scrollToLoopIndex(loopIndex, "auto");
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [loopIndex]);

  // Handle scroll to update indices and perform jump at edges
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const viewport = el.clientWidth;
    const idx = Math.round(el.scrollLeft / viewport);

    // If user stopped exactly on a snap point, update state
    if (idx !== loopIndex) {
      setLoopIndex(idx);
    }

    // Map loop index to real index
    const real =
      idx === 0 ? SERVICES.length - 1 : idx === slides.length - 1 ? 0 : idx - 1;
    setActiveRealIndex(real);

    // Infinite loop jump (when we hit clones)
    // Use a microtask to allow snap to finish before we jump without animation
    if (idx === 0) {
      queueMicrotask(() => {
        setLoopIndex(SERVICES.length);
        scrollToLoopIndex(SERVICES.length, "auto");
      });
    } else if (idx === slides.length - 1) {
      queueMicrotask(() => {
        setLoopIndex(1);
        scrollToLoopIndex(1, "auto");
      });
    }
  };

  const goPrev = () => {
    const target = loopIndex - 1;
    setExpandedIndex(null);
    scrollToLoopIndex(target);
    setLoopIndex(target);
  };

  const goNext = () => {
    const target = loopIndex + 1;
    setExpandedIndex(null);
    scrollToLoopIndex(target);
    setLoopIndex(target);
  };

  return (
    <section id="services" className="relative w-full py-8 bg-[#38b6ff]">
      {/* Mobile-only header */}
      <h2 className="md:hidden text-white text-3xl font-bold text-center mb-4">
        Services
      </h2>

      {/* ===== MOBILE: Infinite loop carousel ===== */}
      <div className="md:hidden relative">
        {/* Track (each slide = full viewport width) */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="
            flex overflow-x-auto snap-x snap-mandatory scroll-smooth
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            w-screen
          "
          style={{ scrollSnapType: "x mandatory" }}
        >
          {slides.map((s, idx) => {
            // Is this slide the active real index?
            const isActive =
              (idx === 0 && activeRealIndex === SERVICES.length - 1) ||
              (idx === slides.length - 1 && activeRealIndex === 0) ||
              idx - 1 === activeRealIndex;

            return (
              <div
                key={`${s.id}-clone-${idx}`}
                className="
                  snap-center shrink-0 w-screen
                  flex items-start justify-center
                  px-0
                "
              >
                {/* Center the card within the full-width slide */}
                <div className="pt-1">
                  <ServiceCard
                    {...s}
                    expanded={
                      expandedIndex ===
                      (idx - 1 + SERVICES.length) % SERVICES.length
                    }
                    setExpanded={() =>
                      setExpandedIndex((prev) =>
                        prev === (idx - 1 + SERVICES.length) % SERVICES.length
                          ? null
                          : (idx - 1 + SERVICES.length) % SERVICES.length
                      )
                    }
                    isActive={isActive}
                    isDimmed={false}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-1 active:scale-95"
          onClick={goPrev}
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>
        <button
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-1 active:scale-95"
          onClick={goNext}
        >
          <ChevronRightIcon className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* ===== DESKTOP/TABLET: original grid ===== */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
            {SERVICES.map((s, index) => (
              <div key={s.id}>
                <ServiceCard
                  {...s}
                  expanded={expandedIndex === index}
                  setExpanded={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  isActive={false}
                  isDimmed={false}
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
