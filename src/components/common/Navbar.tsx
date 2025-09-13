"use client";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldDog,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header id="header" className="border-b-2 border-black dark:border-white">
      <nav
        id="nav"
        className="navbar flex flex-row justify-between py-5 px-5 items-center"
      >
        <div id="nav-logo" className="flex flex-row gap-5">
          <FontAwesomeIcon icon={faShieldDog} size="2xl" />
          <p className="font-bold text-2xl">RLS Guard Dog</p>
        </div>
        <div
          id="nav-content"
          className="hidden md:flex flex-row gap-12 text-xl items-center"
        >
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <div id="btn-wrapper" className="gap-10">
            <button
              type="button"
              className="btn px-6 py-3 text-white hover:text-black bg-[#18604a] hover:bg-[#D0F6EA] 
             hover:brightness-110 hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] 
             transition-all duration-500 ease-in-out"
            >
              <Link href="/login">Login</Link>
            </button>
            <button type="button" className="btn hover:underline py-2 px-4">
              <Link href="/signup">Sign up</Link>
            </button>
          </div>
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
        </button>
      </nav>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 text-lg border-t border-gray-300 dark:border-gray-700">
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="hover:underline"
          >
            About
          </Link>
          <Link href="/login" onClick={() => setMobileOpen(false)}>
            <button
              type="button"
              className="w-135 px-6 py-3 text-white hover:text-black bg-[#18604a] hover:bg-[#D0F6EA]
              hover:brightness-110 hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] 
              transition-all duration-500 ease-in-out"
            >
              Login
            </button>
          </Link>
          <Link href="/signup" onClick={() => setMobileOpen(false)}>
            <button
              type="button"
              className="w-135 py-2 px-4 border border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Sign up
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
