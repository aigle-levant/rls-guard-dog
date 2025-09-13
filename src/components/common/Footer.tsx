"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldDog } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer id="footer" className="py-4 flex flex-col">
      <div
        id="quote-wrapper"
        className="border-t-2 border-black dark:border-white py-4 px-3"
      >
        <div className="text-center py-5 px-3">
          <p className="font-heading font-bold text-3xl">
            &quot;Every developer has a testing environment. Not everyone has a
            separate production environment.&quot;
          </p>
        </div>
      </div>
      <div id="footer-content" className="flex flex-row justify-around py-6">
        <div id="title-socials-container">
          <div id="title-container" className="flex flex-col">
            <FontAwesomeIcon icon={faShieldDog} size="2xl" />
            <p className="font-heading font-bold mb-4 my-2 text-3xl">
              RLS Guard Dog
            </p>
          </div>
          <div id="socials-container" className="flex flex-col font-body gap-2">
            <Link
              href="https://www.linkedin.com/in/prajanya-subramanian"
              className="hover:font-bold text-footer-text hover:text-text"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/aigle-levant/doripomo"
              className="hover:font-bold text-footer-text hover:text-text"
            >
              GitHub
            </Link>
            <Link
              href="https://x.com/aiglelevant"
              className="hover:font-bold text-footer-text hover:text-text"
            >
              X [also known as Twitter]
            </Link>
          </div>
        </div>
        <div
          id="links-container"
          className="flex flex-row justify-around gap-14"
        >
          <div id="get-started-links-container" className="flex flex-col">
            <p className="font-heading font-bold mb-2 text-2xl">Get started</p>
            <div id="get-started-links" className="font-body flex flex-col">
              <Link
                href="/about"
                className="hover:font-bold text-footer-text hover:text-text"
              >
                About
              </Link>
              <Link
                href="/login"
                className="hover:font-bold text-footer-text hover:text-text"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hover:font-bold text-footer-text hover:text-text"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div id="footer-bottom-content" className="flexflex-row font-body px-10">
        <div id="license">
          <p className="font-body">
            © {new Date().getFullYear()} Doripomo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
