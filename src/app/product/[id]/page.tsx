"use client";

import React, { use, useContext, useState } from "react";
import { AppContext } from "@/app/context/AppContext";
import Image from "next/image";
import AddToCart from "@/app/components/AddToCart";
import Link from "next/link";
import { MdOutlineCompareArrows } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";

interface ParamType {
  params: Promise<{
    id: string;
  }>;
}

const SingleProduct = ({ params }: ParamType) => {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const context = useContext(AppContext);

  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!context) return <p>Loading...</p>;

  const { state } = context;
  const { data } = state;

  const product = data.find((crnt) => crnt.id.toString() === id);
  const relatedProducts = data.slice(0, 4);

  // Initialize the selected image once the product is available
  if (product && !selectedImage) {
    setSelectedImage(product.images[0]);
  }

  const reviews = [
    { name: "Ali", review: "Amazing product, worth the price!" },
    { name: "Sara", review: "Good quality and fast delivery." },
    { name: "Ahmed", review: "Highly recommend this to everyone." },
  ];


  return (
    <>
      {product && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              {/* Main Large Image */}
              <Image
                alt="ecommerce"
                src={`/products/${selectedImage}`}
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                width={400}
                height={400}
              />

              {/* Product Details */}
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-5xl title-font font-semibold mb-1">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-2">
                  <h5 className="text-4xl text-gray-500">Rs{product.price}</h5>
                </div>
                <p className="leading-relaxed">{product.shortDescription}</p>

                {/* Thumbnail Images */}
                <div className="flex gap-4 mt-4">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`border ${
                        selectedImage === image
                          ? "border-skinColor"
                          : "border-gray-200"
                      } p-1 rounded-md cursor-pointer transition-transform transform hover:scale-105`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <Image
                        src={`/products/${image}`}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col mt-3 pb-5 border-b-2 border-gray-100 mb-5">
                  <AddToCart product={product} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          className={`px-6 py-2 ${
            activeTab === "description" ? "text-black" : "text-gray-500"
          } rounded`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`px-6 py-2 ${
            activeTab === "additionalInfo" ? "text-black" : "text-gray-500"
          } rounded`}
          onClick={() => setActiveTab("additionalInfo")}
        >
          Additional Information
        </button>
        <button
          className={`px-6 py-2 ${
            activeTab === "reviews" ? "text-black" : "text-gray-500"
          } rounded`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      {product && (
        <div className="mt-6 w-11/12 mx-auto">
          {activeTab === "description" && (
            <div>
              <p className="text-gray-500 px-20">{product.longDescription}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={`/products/${image}`}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-[350px] w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "additionalInfo" && (
            <div>
              <h3 className="text-2xl font-semibold">Additional Information</h3>
              <ul className="list-disc list-inside mt-2">
                <li>Material: Premium quality</li>
                <li>Available Sizes: S, M, L, XL</li>
                <li>Warranty: 1 year</li>
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-2xl font-semibold">Customer Reviews</h3>
              {reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 mb-4 border-gray-300">
                  <h4 className="font-semibold">{review.name}</h4>
                  <p>{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <h1 className="text-center font-bold text-3xl mt-12  mb-5 ">
        Related Products
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6 w-11/12 mx-auto mt-6">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group bg-gray-100 overflow-hidden relative flex flex-col  transition-shadow">
                {/* Offer Badge */}
                {product.offer && (
                  <div
                    className={`${
                      product.offer === "New" ? "bg-teal-400" : "bg-red-500"
                    } absolute top-4 right-4 w-14 h-14 text-white rounded-full flex items-center justify-center shadow-md`}
                  >
                    {product.offer}
                  </div>
                )}

                {/* Product Image */}
                <div className="w-full h-64 relative overflow-hidden">
                  <Image
                    src={`/products/${product.images[0]}`}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Hover Overlay Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2">
                  <button className="text-brownColor text-sm bg-white px-4 py-2  ">
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

                    <button className=" text-sm mx-1 text-white px-4 py-2 rounded">
                      Like
                    </button>
                  </div>
                </div>

                {/* Product Information */}
                <div className="px-5 pb-4 mt-auto flex flex-col justify-between">
                  <h3 className="text-lg font-semibold mt-2">
                    {product.title}
                  </h3>
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
      <Link className="flex justify-center" href="/shop">
        <button className="border border-brownColor text-brownColor px-4 py-2 bg-white my-12">
          Show More
        </button>
      </Link>
    </>
  );
};

export default SingleProduct;
