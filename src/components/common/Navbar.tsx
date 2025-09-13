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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header id="header" className="border-b-2 border-black dark:border-white">
      <nav id="nav" className="navbar flex flex-row justify-between">
        <div id="nav-logo" className="flex flex-row gap-5">
          <FontAwesomeIcon icon={faShieldDog} style={{ color: "#18604a" }} />
          <p className="font-heading">RLS Guard Dog</p>
        </div>
        <div id="nav-content" className="flex flex-row gap-10">
          <Link href="/about">About</Link>
          <div id="btn-wrapper">
            <button type="button" className="btn "
          </div>
        </div>
      </nav>
    </header>
  );
}
