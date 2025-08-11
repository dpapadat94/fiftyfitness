import React, { useState } from "react";
import Laptop from "../assets/laptop.png";
import Group from "../assets/group.png";
import Weight from "../assets/weight.png";

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
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" className="relative w-full py-8 bg-[#38b6ff]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
          {SERVICES.map((s, index) => (
            <div
              key={s.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="transition-all duration-300"
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
    </section>
  );
};

export default Services;
