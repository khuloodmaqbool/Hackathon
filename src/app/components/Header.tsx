"use client";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { TbUserExclamation } from "react-icons/tb";
import { PiHeart } from "react-icons/pi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const list_styles = `px-3 py-2 font-medium`;
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-1 z-40 lg:px-9 md:px-9 px-3 bg-white">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 bg-white">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                width={100}
                height={100}
                alt="Logo"
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {["/", "/shop", "/blogs", "/contact"].map((path) => (
                <Link
                  key={path}
                  href={path}
                  className={`text-sm ${list_styles} ${
                    pathname === path
                      ? "border-b-2 border-orange_color text-brownColor"
                      : "text-black hover:text-brownColor"
                  }`}
                >
                  {path === "/" ? "Home" : path.replace("/", "").toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* Cart Icon */}
          <div className="hidden sm:flex space-x-4">
            <Link className="relative" href="#">
              <TbUserExclamation className="h-6 w-6 text-black" />
            </Link>
            <Link className="relative" href="#">
              <IoIosSearch className="h-6 w-6 text-black" />
            </Link>
            <Link className="relative" href="#">
              <PiHeart className="h-6 w-6 text-black" />
            </Link>

            <div className="relative">
              <Link href="/cart">
                <MdOutlineShoppingCart className="h-6 w-6 text-black bg-white cursor-pointer" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="rounded-md p-2 text-gray-600"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>

              {/* Hamburger Icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              {/* Close Icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {["/", "/shop", "/blogs", "/contact"].map((path) => (
              <Link
                key={path}
                href={path}
                className={`block text-base ${list_styles} ${
                  pathname === path
                    ? "border-b-2 border-brownColor text-brownColor"
                    : "text-black hover:text-brownColor"
                }`}
              >
                {path === "/" ? "Home" : path.replace("/", "").toUpperCase()}
              </Link>
            ))}

            {/* Mobile-specific Icons */}
            <Link className="flex items-center" href="/cart">
              <MdOutlineShoppingCart className="h-8 w-8 my-2 text-black" />
            </Link>
            <Link className="flex items-center" href="#">
              <TbUserExclamation className="h-8 w-8 my-2 text-black" />
            </Link>
            <Link className="flex items-center" href="#">
              <IoIosSearch className="h-8 w-8 my-2 text-black" />
            </Link>
            <Link className="flex items-center" href="#">
              <PiHeart className="h-8 w-8 my-2 text-black" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
