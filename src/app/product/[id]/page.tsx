"use client";
import React, { useContext, useState,  useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { AppContext } from "@/app/context/AppContext";
import Image from "next/image";
import AddToCart from "@/app/components/AddToCart";
import Link from "next/link";
import { MdOutlineCompareArrows } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { PiHeart } from "react-icons/pi";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";

const SingleProduct = () => {
  const { id: productId } = useParams();
  const context = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const builder = imageUrlBuilder(client);
  const urlFor = useCallback(
    (source: SanityImageSource) =>
      builder.image(source).auto("format").fit("max").quality(80).width(600),
    [builder]
  );

  const { state } = context || {};
  const { data = [] } = state || {};
  const relatedProducts = data.slice(0, 4);
  const product = data.find((crnt) => crnt._id.toString() === String(productId));

  useEffect(() => {
    if (product && product.images?.length > 0 && !selectedImage) {
      const defaultImageUrl = urlFor(product.images[0])?.url();
      setSelectedImage(defaultImageUrl || "");
    }
  }, [product, selectedImage, urlFor]);
    // Initialize selectedImage with the first image if available
    // const defaultImage = product?.images?.[0] ? urlFor(product.images[0]).url() : null;
    // const [selectedImage, setSelectedImage] = useState<string | null>(defaultImage);
  
  const reviews = [
    { name: "Ali", review: "Amazing product, worth the price!" },
    { name: "Sara", review: "Good quality and fast delivery." },
    { name: "Ahmed", review: "Highly recommend this to everyone." },
  ];
  return (
    <>
      {product ? (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:h-auto h-64">
                <div
                  className="rounded bg-cover bg-center w-full h-full"
                  style={{ backgroundImage: `url(${selectedImage})` }}
                />
              </div>

              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-5xl title-font font-semibold mb-1">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-2">
                  <h5 className="text-4xl text-gray-500">Rs {product.price}</h5>
                </div>
                <p className="leading-relaxed">{product.description}</p>

                <div className="flex gap-4 mt-4">
                  {product.images?.map((image, index) => {
                    const imageUrl = urlFor(image)?.url();
                    return imageUrl ? (
                      <div
                        key={index}
                        className={`w-20 h-20 bg-cover bg-center border ${
                          selectedImage === imageUrl
                            ? "border-skinColor"
                            : "border-gray-200"
                        } p-1 rounded-md cursor-pointer transition-transform transform hover:scale-105`}
                        style={{ backgroundImage: `url(${imageUrl})` }}
                        onClick={() => setSelectedImage(imageUrl)}
                      />
                    ) : null;
                  })}
                </div>

                <div className="flex flex-col mt-3 pb-5 border-b-2 border-gray-100 mb-5">
                  <AddToCart product={product} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-500">Loading product...</p>
      )}

      <div className="flex justify-center gap-4 mt-8">
        {["description", "additionalInfo", "reviews"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 ${
              activeTab === tab ? "text-black" : "text-gray-500"
            } rounded`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() +
              tab.slice(1).replace("Info", " Information")}
          </button>
        ))}
      </div>
      {product && (
        <div className="mt-6 w-11/12 mx-auto">
          {activeTab === "description" && <div />}
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
              {reviews.map((review, index) => (
                <div key={index} className="border p-4 rounded">
                  <h4>{review.name}</h4>
                  <p>{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <h1 className="text-center font-bold text-3xl mt-12 mb-5">
        Related Products
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6 w-11/12 mx-auto mt-6">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((relatedProduct) => (
            <Link
              key={relatedProduct._id}
              href={`/product/${relatedProduct._id}`}
            >
              <div className="group bg-gray-100 overflow-hidden relative flex flex-col transition-shadow">
                {relatedProduct.offer && (
                  <div
                    className={`${
                      relatedProduct.offer === "New"
                        ? "bg-teal-400"
                        : "bg-red-500"
                    } z-10 absolute top-4 right-4 w-14 h-14 text-white rounded-full flex items-center justify-center shadow-md text-sm `}
                  >
                    {relatedProduct.offer}
                  </div>
                )}

                {/* Product Image */}
                <div className="w-full h-64 relative overflow-hidden">
                  {relatedProduct.images && relatedProduct.images.length > 0 ? (
                    relatedProduct.images.map((image, index) => {
                      if (!image) return null; // Skip invalid images
                      const imageUrl = urlFor(image)?.url();
                      return imageUrl ? (
                        <Image
                          key={index}
                          alt={`${relatedProduct.name} image ${index + 1}`}
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
                    {relatedProduct.title}
                  </h3>
                  {/* <h3></h3> */}
                  <h3 className="text-gray-500 mt-1">{relatedProduct.name}</h3>
                  <p className="font-semibold mt-2">
                    Rp {relatedProduct.price}{" "}
                    <span className="text-gray-500 font-normal line-through">
                      {relatedProduct.price * 2}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center">Loading related products...</p>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
