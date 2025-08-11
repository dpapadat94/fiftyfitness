import React, { useState } from "react";
import TrainerImg from "../assets/trainer.png"; // update path

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="bg-gray-50 py-12">
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
                      flex flex-col md:flex-row gap-8
                      items-center md:items-start text-center md:text-left"
      >
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={TrainerImg}
            alt="Trainer"
            className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-md mx-auto"
          />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Meet your Trainer</h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Stephanie Bush Hoffman is a graduate of UNC–Charlotte, where she
            earned her Bachelor of Science in Exercise Science in 2007. She is a
            certified Personal Trainer and Senior Fitness Specialist through the
            National Academy of Sports Medicine (NASM), and has worked in the
            health and fitness industry for over 15 years.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Stephanie’s experience spans a wide range of populations—from youth
            and beginners to the elderly, individuals with chronic conditions,
            post-rehab clients, athletes, and those already living a fit and
            active lifestyle. Her areas of expertise include small group
            training, flexibility and mobility work, balance training, and
            functional fitness. She’s known for her deep commitment to helping
            clients understand the "why" behind both exercise and nutrition.
            {!expanded && (
              <>
                {" "}
                <button
                  onClick={() => setExpanded(true)}
                  className="align-baseline font-semibold underline text-sky-600 hover:text-sky-700
                             p-0 m-0 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent
                             border-0 outline-none"
                >
                  Read more . . .
                </button>
              </>
            )}
          </p>

          {expanded && (
            <>
              <p className="text-gray-700 leading-relaxed mb-4">
                With a strong emphasis on proper form and smart progression, she
                ensures each client moves safely and efficiently toward their
                goals. Stephanie believes that while many people overlook
                nutrition, it is just as vital as movement when it comes to
                transforming both body and health.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Over the course of her career, Stephanie has developed a special
                passion for working with older adults. She is now in her fifth
                year as the owner of Fifty+ Fitness, LLC, an in-home and virtual
                personal training business dedicated to helping adults 50 and up
                get stronger, fitter, more balanced, and healthier—all from the
                comfort of their own homes.
              </p>
              <p className="text-gray-700 italic mb-4">
                “My grandparents were never healthy, and I watched their health
                steadily decline throughout my childhood. As a teenager, I
                promised myself I’d take a different path. I started working out
                at 14 and haven’t stopped since. Today, I get to help other
                adults stay strong, independent, and motivated. Watching my
                clients gain confidence, strength, flexibility, and balance—and
                seeing them thrive in everyday life—brings me incredible joy,”
                says Stephanie.
              </p>
              <p className="text-gray-700 leading-relaxed">
                When she’s not training clients, Stephanie enjoys working out,
                reading, cooking, relaxing, and playfully convincing her
                19-year-old son to hang out with her.{" "}
                <button
                  onClick={() => setExpanded(false)}
                  className="align-baseline font-semibold underline text-sky-600 hover:text-sky-700
                             p-0 m-0 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent
                             border-0 outline-none"
                >
                  See less
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
