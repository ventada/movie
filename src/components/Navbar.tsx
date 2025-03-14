"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-yellow-500 font-bold text-2xl">
                MovieDB
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/movies"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
              >
                Movies
              </Link>
              <Link
                href="/tv-shows"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
              >
                TV Shows
              </Link>
              <Link
                href="/top-rated"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
              >
                Top Rated
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Link
              href="/login"
              className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-yellow-500 text-gray-900 hover:bg-yellow-400"
            >
              Sign Up
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/movies"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white"
            >
              Movies
            </Link>
            <Link
              href="/tv-shows"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white"
            >
              TV Shows
            </Link>
            <Link
              href="/top-rated"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white"
            >
              Top Rated
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center">
                  <span className="text-xl font-medium text-white">G</span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium">Guest User</div>
                <div className="text-sm font-medium text-gray-400">
                  guest@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
