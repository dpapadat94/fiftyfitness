import React from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const Contact = () => {
  return (
    <section id="contact" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Top blue band */}
          <div className="bg-[#38b6ff] text-white p-6 sm:p-8 rounded-t-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Lets Work Together!
                </h2>
                <p className="max-w-md leading-relaxed">
                  "I help older men and women improve their balance, strength
                  and endurance so they can continue to enjoy life as long as
                  possible."
                </p>
              </div>

              {/* On small + medium screens, show the form in-flow */}
              <div className="lg:hidden">
                <div className="bg-white text-zinc-800 rounded-2xl shadow-xl p-6 sm:p-7 w-full mt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Schedule Your Free Assessment
                  </h3>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full rounded-full bg-zinc-100 px-4 py-3 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full rounded-full bg-zinc-100 px-4 py-3 outline-none"
                    />
                    <textarea
                      rows={5}
                      placeholder="Type here..."
                      className="w-full rounded-2xl bg-zinc-100 px-4 py-3 outline-none resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-full px-6 py-3 bg-[#38b6ff] text-white shadow
                                 hover:opacity-95 active:opacity-90 transition"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom white details */}
          <div
            className="bg-white p-6 sm:p-8 border border-zinc-100 border-t-0 rounded-b-md
                          lg:pt-24"
          >
            {/* Extra top padding on lg+ so the overlapped card doesn't cover content */}
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-zinc-700">
                <PhoneIcon className="w-5 h-5" />
                <span>(704) 614-1367</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700">
                <EnvelopeIcon className="w-5 h-5" />
                <span>stephanie@50fitnesstraining.com</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700">
                <MapPinIcon className="w-5 h-5" />
                <span>Charlotte, NC</span>
              </li>
            </ul>
          </div>

          {/* Overlapping form card (lg and up only) */}
          <div className="hidden lg:block absolute lg:right-8 top-1/2 -translate-y-1/2 z-10">
            <div className="bg-white text-zinc-800 rounded-2xl shadow-2xl p-7 w-[28rem] max-w-[90vw]">
              <h3 className="text-lg font-semibold mb-4">
                Schedule Your Free Assessment
              </h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-full bg-zinc-100 px-4 py-3 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-full bg-zinc-100 px-4 py-3 outline-none"
                />
                <textarea
                  rows={5}
                  placeholder="Type here..."
                  className="w-full rounded-2xl bg-zinc-100 px-4 py-3 outline-none resize-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-full px-6 py-3 bg-[#38b6ff] text-white shadow
                             hover:opacity-95 active:opacity-90 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
