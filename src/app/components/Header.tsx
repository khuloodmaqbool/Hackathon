"use client";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { TbUserExclamation } from "react-icons/tb";
import { PiHeart } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";

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

            <div className="relative" >
              <div className="drawer drawer-end z-50 h-fit">
                <input
                  id="my-drawer-4"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label
                    htmlFor="my-drawer-4"
                    className="drawer-button cursor-pointer"
                  >
                    <MdOutlineShoppingCart className="h-6 w-6 text-black bg-white cursor-pointer" />
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-6 relative">
                    {/* Close Button */}
                    <label
                      htmlFor="my-drawer-4"
                      aria-label="close drawer"
                      className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-800 cursor-pointer"
                    >
                      &times;
                    </label>

                    {/* Title */}
                    <h2 className="text-lg semifont-bold mb-6 ">
                      Shopping Cart
                    </h2>
                    <hr />

                    {/* Sidebar Item */}
                    <li className=" border-b pb-4 mb-4">
                      <div className="flex gap-2 justify-between p-0">
                        <Image
                          src="/products/lolita.png"
                          alt="lolita"
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-lg"
                        />
                        <div>
                          <h5 className="text-sm font-medium text-gray-700">
                            Asguard Sofa
                          </h5>
                          <p className="text-sm text-gray-600  py-4">
                            1 ×
                            <span className="font-semibold text-brownColor">
                              Rs. 250,000.00
                            </span>
                          </p>
                        </div>
                        <RxCross1 className="bg-gray-600 rounded-full w-4 h-4 text-white p-1" />
                      </div>
                    </li>

                    {/* Total Section */}
                    <div className="mt-auto">
                      <p className="text-lg font-medium flex justify-between">
                        Subtotal:{" "}
                        <span className="font-semibold text-brownColor">
                          Rs. 250,000.00
                        </span>
                      </p>
                    <Link href="cart" >
                    <button className="w-full mt-4 bg-brownColor text-white px-4 py-2 rounded-lg hover:bg-brownColor-dark">
                        Proceed to Checkout
                      </button>
                    </Link>
                    </div>
                  </ul>
                </div>
              </div>
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
            <Link className="flex items-center " href="/cart">
            <MdOutlineShoppingCart className="h-8  w-8 my-2 text-black" />
            </Link>
            <Link className="flex items-center " href="#">
              <TbUserExclamation className="h-8  w-8 my-2 text-black" />
            </Link>
            <Link className="flex items-center " href="#">
              <IoIosSearch className="h-8  w-8 my-2 text-black" />
            </Link>
            <Link className="flex items-center " href="#">
              <PiHeart className="h-8  w-8 my-2 text-black" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
