"use client";

import HeaderBanner from "@/app/components/HeaderBanner";
import { AppContext } from "@/app/context/AppContext";
import { useContext } from "react";
import { MdOutlineCompareArrows } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { BsViewList } from "react-icons/bs";
import { MdFilterList } from "react-icons/md";

import Image from "next/image";
import FooterHeader from "@/app/components/FooterHeader";
import Link from "next/link";
import { PiHeart } from "react-icons/pi";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";

const Shop = () => {
  const builder = imageUrlBuilder(client);

  const urlFor = (source: SanityImageSource) =>
    builder.image(source).auto("format").fit("max").quality(80).width(600);

  const context = useContext(AppContext);

  if (!context) return <p>Loading...</p>;

  const { state } = context;
  const { data } = state;

  return (
    <>
      <HeaderBanner heading="Shop" />
      <div className="bg-skinColor w-full grid grid-cols-1 md:grid-cols-2 py-3 px-12 mb-16">
        {/* Filter and View Icons */}
        <div className="flex items-center space-x-4  my-3 md:my-0 ">
          <button className="flex items-center text-gray-700 hover:text-black">
            <MdFilterList className="text-2xl" />
            <span className="ml-2">Filter</span>
          </button>

          <button className="flex items-center text-gray-700 hover:text-black">
            <IoGrid className="text-2xl" />
            <span className="ml-2">Grid</span>
          </button>

          <button className="flex items-center text-gray-700 hover:text-black">
            <BsViewList className="text-2xl" />
            <span className="ml-2">List</span>
          </button>

          <p className="text-gray-600 border-gray-400 px-3 border-l-2">
            Showing 1–16 of 32 results
          </p>
        </div>

        <div className="flex items-center justify-start md:justify-end space-x-6 my-3 md:my-0 ">
          {/* Show products count */}
          <div className="flex items-center">
            <p className="font-medium">Show</p>
            <span className="bg-white text-gray-700 px-4 py-2 ml-2 rounded">
              {data.length === 0 ? 0 : data.length}
            </span>
          </div>

          {/* Sorting Dropdown */}
          <div>
            <p className="font-medium mb-1 ">
              Sort By
              <select className="ms-2 bg-white rounded px-4 py-2 text-gray-700">
                <option value="default">Default</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6 w-11/12 mx-auto mt-6">
        {data.length > 0 ? (
          data.map((product, ind:number) => (
            <Link key={ind} href={`/product/${product._id}`}>
              <div className="group bg-gray-100 overflow-hidden relative flex flex-col transition-shadow">
              {product.offer && (
                  <div
                    className={`${
                      product.offer === "New" ? "bg-teal-400" : "bg-red-500"
                    } z-10 absolute top-4 right-4 w-14 h-14 text-white rounded-full flex items-center justify-center shadow-md text-sm `}
                  >
                    {product.offer}
                  </div>
                )}


                {/* Product Image */}
                <div className="w-full h-64 relative overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    product.images.map((image, index) => {
                      if (!image) return null; // Skip invalid images
                      const imageUrl = urlFor(image)?.url();
                      return imageUrl ? (
                        <Image
                          key={index}
                          alt={`${product.name} image ${index + 1}`}
                          src={imageUrl}
                          width={300}
                          height={300}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <p key={index} className="text-center text-gray-500">
                          No image available
                        </p>
                      );
                    })
                  ) : (
                    <p className="text-center text-gray-500">
                      No images available
                    </p>
                  )}
                </div>

                {/* Hover Overlay Effect */}
                <div className="z-20 absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2">
                  <button className="text-brownColor text-sm bg-white px-4 py-2">
                    Add to Cart
                  </button>

                  <div className="flex">
                    <button className="text-sm mx-1 text-white px-4 py-2 rounded flex items-center">
                      <IoShareSocialOutline className="mr-2" />
                      Share
                    </button>

                    <button className=" text-sm mx-1 text-white px-4 py-2 rounded flex items-center">
                      <MdOutlineCompareArrows className="mr-2" />
                      Compare
                    </button>

                    <button className=" text-sm mx-1 text-white px-4 py-2 rounded  flex items-center">
                      <PiHeart className="mr-2" />
                      Like
                    </button>
                  </div>
                </div>

                {/* Product Information */}
                <div className="px-5 pb-4 mt-auto flex flex-col justify-between">
                  <h3 className="text-lg font-semibold mt-2">
                    {product.title}
                  </h3>
                  {/* <h3></h3> */}
                  <h3 className="text-gray-500 mt-1">{product.name}</h3>
                  <p className="font-semibold mt-2">
                    Rp {product.price}{" "}
                    <span className="text-gray-500 font-normal line-through">
                      {product.price * 2}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>...loading</p>
        )}
      </div>
      <FooterHeader />
    </>
  );
};

export default Shop;
