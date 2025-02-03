"use client";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="h-screen bg-cover bg-center bg-no-repeat px-6 lg:px-12 py-28 lg:py-0 flex items-center"
      style={{ backgroundImage: "url('/images/banner.webp')" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Empty div for layout structure */}
        <div></div>

        {/* Content Section */}
        <div className="bg-skinColor p-6 md:p-10 rounded-lg shadow-lg">
          <h5 className="text-lg font-semibold text-gray-700">New Arrival</h5>
          <h1 className="text-4xl md:text-5xl font-bold my-3 text-brownColor">
            Discover Our <br /> New Collection
          </h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <Link href="/shop">
            <button
              className="py-3 px-6 md:py-4 md:px-8 bg-brownColor text-white mt-6 rounded-lg hover:bg-opacity-90 transition-all duration-300"
              aria-label="Shop now"
            >
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
