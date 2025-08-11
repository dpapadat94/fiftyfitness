import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.png"; // <-- add your logo

const SCROLL_OFFSET = 80;

function scrollToSection(id, then) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
  if (then) then();
}

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const toggle = () => setNav((s) => !s);
  const close = () => setNav(false);

  return (
    <div className="w-screen h-[80px] z-50 bg-zinc-100 fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Fifty Plus Fitness Logo"
            className="h-12 w-auto mr-4 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          />

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li
              className="cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              Home
            </li>
            <li
              className="cursor-pointer"
              onClick={() => scrollToSection("about")}
            >
              About
            </li>
            <li
              className="cursor-pointer"
              onClick={() => scrollToSection("services")}
            >
              Services
            </li>
            <li
              className="cursor-pointer"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:flex pr-4">
          <button
            className="bg-[#38b6ff] text-white px-8 py-3 rounded-md"
            onClick={() => scrollToSection("contact")}
          >
            Free Assessment
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden cursor-pointer" onClick={toggle}>
          {!nav ? (
            <Bars3Icon className="w-6 h-6" />
          ) : (
            <XMarkIcon className="w-6 h-6" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={
          !nav ? "hidden" : "absolute top-[80px] left-0 bg-zinc-100 w-full px-8"
        }
      >
        <li
          className="border-b-2 border-zinc-200 py-3"
          onClick={() => scrollToSection("hero", close)}
        >
          Home
        </li>
        <li
          className="border-b-2 border-zinc-200 py-3"
          onClick={() => scrollToSection("about", close)}
        >
          About
        </li>
        <li
          className="border-b-2 border-zinc-200 py-3"
          onClick={() => scrollToSection("services", close)}
        >
          Services
        </li>
        <li
          className="border-b-2 border-zinc-200 py-3"
          onClick={() => scrollToSection("contact", close)}
        >
          Contact
        </li>
        <button
          className="bg-[#38b6ff] text-white w-full my-4 px-8 py-3 rounded-md"
          onClick={() => scrollToSection("contact", close)}
        >
          Free Assessment
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
