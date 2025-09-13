import React from "react";
import ElderPic from "../assets/elderpic.png"; // adjust extension if needed

const POINTS = [
  { emoji: "💪", text: "Stay strong, mobile & independent" },
  { emoji: "🧠", text: "Keep your mind sharp & focused" },
  { emoji: "❤️", text: "Protect your heart & circulation" },
  { emoji: "🦴", text: "Build bone strength & joint health" },
  { emoji: "⚡", text: "Boost your daily energy levels" },
  { emoji: "😌", text: "Melt away stress & lift your mood" },
  { emoji: "😴", text: "Sleep deeper & wake up refreshed" },
  { emoji: "🚶‍♀️", text: "Reduce falls, move with confidence" },
];

export default function Important() {
  return (
    <section id="why-exercise" className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered heading */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">
          Why Exercise After 50 Is a Game-Changer <span aria-hidden>🌟</span>
        </h2>

        {/* Side-by-side on md+, flipped so text is left and image is right */}
        <div className="md:flex md:flex-row-reverse md:items-center md:justify-start md:gap-6">
          {/* Image (hidden on mobile) */}
          <img
            src={ElderPic}
            alt="Older adult lifting light dumbbells"
            className="hidden md:block flex-none md:h-[420px] w-auto drop-shadow-xl"
            loading="lazy"
          />

          {/* Benefits */}
          <div className="flex-1">
            {/* Mobile: 2-column grid; emoji stacked and centered above text */}
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 md:hidden">
              {POINTS.map(({ emoji, text }, i) => (
                <li
                  key={i}
                  className="flex flex-col items-center text-center gap-1 text-zinc-800"
                >
                  <span className="text-xl leading-5">{emoji}</span>
                  <span className="text-sm leading-5">{text}</span>
                </li>
              ))}
            </ul>

            {/* Desktop/Tablet: tidy two-column list with soft bubbles */}
            <ul className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-2.5">
              {POINTS.map(({ emoji, text }, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#38b6ff]/10 text-2xl"
                    aria-hidden
                  >
                    {emoji}
                  </span>
                  <span className="text-zinc-800 font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
