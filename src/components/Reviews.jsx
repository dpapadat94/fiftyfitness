import React, { useRef, useState, useEffect } from "react";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=1a8f6c894285d156&rlz=1C5CHFA_enUS1000US1000&sxsrf=AE3TifOSLg0ElKx8U-I5pqY7UmovORQ5_g:1757778167429&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E8CbQqG6TZZRNEhAZUBBUB19Ko8PZzjQ4VhRUJ0dd8tx5aqNdw_2NqJwcYAJLWJxfqtfu8eZTQ1mfbpEZGbzqGrTu7WEWVXk9tTh80lYOXkCObA99A%3D%3D&q=FIfty%2B+Fitness,+LLC+Reviews&sa=X&ved=2ahUKEwi9wI36idaPAxVbG9AFHc6hG2YQ0bkNegQINxAE&biw=1440&bih=812&dpr=2";

const TOTAL_COUNT = 21;

const REVIEWS = [
  {
    name: "Susan Walker",
    initial: "S",
    color: "bg-orange-500",
    date: "2 years ago",
    rating: 5,
    text: "I have worked with Stephanie Hoffman one-on-one for my fitness training for over 12 years. I've built and maintained excellent strength and flexibility with her guidance, and she knows just which exercises and challenges work best and most appropriately for me. She also helped me recover both carefully and quickly after a knee and two hip replacements! I recommend Fifty+ Fitness and Stephanie with total enthusiasm!",
  },
  {
    name: "Dane Dysert",
    initial: "D",
    color: "bg-blue-600",
    date: "6 months ago",
    rating: 5,
    text: "Even though I am not quite 50, I have enjoyed working with Stephanie for the past 5 years. She is very flexible when it comes to scheduling and works around my hectic schedule.",
  },
  {
    name: "Tom Spindannger",
    initial: "T",
    color: "bg-green-600",
    date: "1 year ago",
    rating: 5,
    text: "I've been working with Stephanie for most of this year. I am coming off two years of injuries and recovery but I became aware of significant muscle atrophy as a result. Stephanie and I worked together to address my needs and concerns while making her aware of some physical limitations. She designs challenging, effective exercise routines that are ever changing and challenging. I have noticed improvements over the last few weeks and look forward to continuing this journey.",
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} star rating`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`h-5 w-5 ${
            i < count ? "text-yellow-400" : "text-zinc-300"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewsCard({ r, expanded, onToggle }) {
  const max = 170;
  const needsTrim = r.text.length > max;
  const short =
    r.text.length <= max
      ? r.text
      : r.text.slice(0, r.text.slice(0, max).lastIndexOf(" ") || max);

  return (
    <article className="h-full rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition p-5">
      {/* top: avatar + name/date */}
      <div className="flex items-center gap-3">
        <div
          className={`h-12 w-12 rounded-full ${r.color} text-white flex items-center justify-center text-lg font-semibold`}
        >
          {r.initial}
        </div>
        <div>
          <div className="font-semibold text-zinc-900">{r.name}</div>
          <div className="text-xs text-zinc-500">{r.date}</div>
        </div>
      </div>

      {/* stars */}
      <div className="mt-3">
        <Stars count={r.rating} />
      </div>

      {/* text + see more/less */}
      <p className="mt-3 text-zinc-700 leading-relaxed">
        {expanded ? r.text : needsTrim ? `${short}… ` : r.text}
        {needsTrim && (
          <button
            type="button"
            onClick={onToggle}
            className="align-baseline font-semibold underline text-[#38b6ff]
                 p-0 m-0 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent
                 border-0"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </p>

      {/* small attribution */}
      <div className="mt-4 text-[11px] text-zinc-500">
        Reviews shown from Google
      </div>
    </article>
  );
}

export default function Reviews() {
  const [expanded, setExpanded] = useState({});
  const toggle = (i) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  const avg = (
    REVIEWS.reduce((s, r) => s + (r.rating || 0), 0) / REVIEWS.length
  ).toFixed(1);

  // --- Mobile slider state ---
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (idx, behavior = "smooth") => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(REVIEWS.length - 1, idx));
    el.scrollTo({ left: clamped * el.clientWidth, behavior });
    setActive(clamped);
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  };

  useEffect(() => {
    const onResize = () => {
      const el = trackRef.current;
      if (!el) return;
      el.scrollTo({ left: active * el.clientWidth, behavior: "auto" });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return (
    <section id="reviews" className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold">
              Our Google Reviews
            </h2>
            <div className="hidden sm:flex items-center gap-2 text-zinc-700">
              <Stars count={5} />
              <span className="text-sm">
                {avg} rating of {TOTAL_COUNT} reviews
              </span>
            </div>
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center rounded-full px-4 py-2  text-white bg-blue-500 text-sm shadow hover:opacity-95"
          >
            See on Google
          </a>
        </div>

        {/* Mobile: 1-at-a-time slider */}
        <div className="relative -mx-4 md:hidden">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {REVIEWS.map((r, i) => (
              <div key={i} className="snap-center shrink-0 w-screen px-4">
                <ReviewsCard
                  r={r}
                  expanded={!!expanded[i]}
                  onToggle={() => toggle(i)}
                />
              </div>
            ))}
          </div>

          {/* arrows */}
          <button
            aria-label="Previous"
            onClick={() => scrollToIndex(active - 1)}
            className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1 bg-white/80 shadow ${
              active === 0
                ? "opacity-50 pointer-events-none"
                : "active:scale-95"
            }`}
          >
            <ChevronLeftIcon className="w-6 h-6 text-black" />
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollToIndex(active + 1)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 bg-white/80 shadow ${
              active === REVIEWS.length - 1
                ? "opacity-50 pointer-events-none"
                : "active:scale-95"
            }`}
          >
            <ChevronRightIcon className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <ReviewsCard
              key={i}
              r={r}
              expanded={!!expanded[i]}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* Mobile CTA row */}
        <div className="sm:hidden mt-5 flex justify-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full px-4 py-2 text-white bg-blue-500 text-sm shadow hover:opacity-95"
          >
            See on Google
          </a>
        </div>
      </div>
    </section>
  );
}
