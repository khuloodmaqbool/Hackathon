import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { CgMail } from "react-icons/cg";
import { MdOutlineLocalPhone } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

const socialLinks = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaTwitter />, href: "#" },
  { icon: <PiInstagramLogoFill />, href: "#" },
  { icon: <FaLinkedinIn />, href: "#" },
];

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Tour", path: "/tour" },
  { name: "Destination", path: "/destination" },
  { name: "Contact", path: "/contact" },
];
const footerLinks2 = [
  { name: "Payment Options", path: "#" },
  { name: "Returns", path: "#" },
  { name: "Privacy Policy", path: "#" },
];

const contactInfo = [
  { icon: <CgMail />, text: "terratrips@gmail.com" },
  { icon: <MdOutlineLocalPhone />, text: "+123 456 789" },
  { icon: <SlLocationPin />, text: "Pakistan" },
];

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-bold text-black text-xl mb-3">Furniro</h2>
            <p className="mb-3 text-gray-400">
            400 University Drive Suite 200 Coral Gables,
            FL 33134 USA
            </p>
            {/* <nav className="list-none mb-10 space-y-2">
              {contactInfo.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 justify-center md:justify-start"
                >
                  <div className="text-greenColor w-6 h-6">{item.icon}</div>
                  <span className="text-white font-semibold hover:text-gray-800">
                    {item.text}
                  </span>
                </li>
              ))}
            </nav> */}
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4 text-black">
            <h2 className="font-medium text-gray-400 text-sm mb-3">Links</h2>
            <nav className="list-none mb-10 space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link className="hover:font-semibold " href={link.path}>
                   <p className="my-6" > {link.name}</p>
                  </Link>
                </li>
              ))}
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4 text-black">
            <h2 className="font-medium text-gray-400 text-sm mb-3">Help</h2>
            <nav className="list-none mb-10 space-y-2">
              {footerLinks2.map((link, index) => (
                <li key={index}>
                  <Link className="hover:font-semibold " href={link.path}>
                    <p className="my-6" >{link.name}</p>
                  </Link>
                </li>
              ))}
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-400 tracking-widest text-sm mb-3">
              Newsletter
            </h2>
            <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
              <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                {/* <label
                  htmlFor="footer-field"
                  className="leading-7 text-sm text-gray-400"
                >
                  Placeholder
                </label> */}
                <input
                  type="text"
                  id="footer-field"
                  name="footer-field"
                  className="w-full  border-b border-black focus:bg-transparent  outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="text-black">
                SUBSCRIBE
              </button>
            </div>
          
          </div>
        </div>
      </div>

      <div className=" mx-8  border-t-2 border-gray-300 ">
        <div className=" py-6 mx-auto flex items-center flex-col sm:flex-row">
       
          <p className="text-sm text-gray-500 sm:ml-6">
          2023 furino. All rights reverved
            
          </p>
      
        </div>
      </div>
    </footer>
  );
};

export default Footer;
