"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { MdOutlineCompareArrows } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import HeroSection from "./components/HeroSection";

const Carousel = dynamic(() => import("./components/Carousel"), { ssr: false });

export default function Home() {
  const builder = imageUrlBuilder(client);
  const urlFor = (source: SanityImageSource) =>
    builder.image(source).auto("format").fit("max").quality(80).width(600);

  const context = useContext(AppContext);
  if (!context) return <p>Loading...</p>;

  const { state } = context;
  const { data } = state;

  const displayProduct = data.slice(0, 4);

  const BrowseRange = [
    {
      img: "/images/dining.webp",
      title: "Dining",
    },
    {
      img: "/images/living.webp",
      title: "Living",
    },
    {
      img: "/images/bedroom.webp",
      title: "Bedroom",
    },
  ];

  return (
    <>
      <HeroSection />
      <h1 className="text-center font-bold text-3xl mt-12">Browse The Range</h1>
      <p className="text-center text-gray-400 mb-5 mt-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="grid md:grid-cols-3 grid-cols-1 w-11/12 mx-auto gap-4">
        {BrowseRange.map((crnt, ind) => (
          <div key={ind} className="mx-auto text-center">
            <Image
              src={crnt.img}
              alt={crnt.title}
              width={300}
              height={300}
              priority
              className="object-cover"
            />
            <h1 className="mt-5 font-bold">{crnt.title}</h1>
          </div>
        ))}
      </div>

      <h1 className="text-center font-bold text-3xl mt-12 mb-5">
        Our Products
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6 w-11/12 mx-auto mt-6">
        {displayProduct.length > 0 ? (
          displayProduct.map((product) => (
            <Link key={product.id} href={`/product/${product._id}`}>
              <div className="group bg-gray-100 overflow-hidden relative flex flex-col transition-shadow ">
                {product.offer && (
                  <div
                    className={`z-10 absolute top-4 right-4 w-14 h-14 text-white rounded-full flex items-center justify-center shadow-md text-sm ${product.offer === "New" ? "bg-teal-400" : "bg-red-500"}`}
                  >
                    {product.offer}
                  </div>
                )}

                <div className="w-full h-64 relative overflow-hidden">
                  {product.images?.length > 0 ? (
                    <Image
                      src={urlFor(product.images[0]).url()}
                      alt={product.name}
                      width={600}
                      height={600}
                      className="object-cover w-full h-full"
                      priority
                    />
                  ) : (
                    <p className="text-center text-gray-500">
                      No images available
                    </p>
                  )}
                </div>

                <div className=" z-20 absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2">
                  <button className="text-brownColor text-sm bg-white px-4 py-2">
                    Add to Cart
                  </button>
                  <div className="flex">
                    <button className="text-sm mx-1 text-white px-4 py-2 rounded flex items-center">
                      <IoShareSocialOutline className="mr-2" />
                      Share
                    </button>
                    <button className="text-sm mx-1 text-white px-4 py-2 rounded flex items-center">
                      <MdOutlineCompareArrows className="mr-2" />
                      Compare
                    </button>
                  </div>
                </div>

                <div className="px-5 pb-4 mt-auto flex flex-col justify-between">
                  <h3 className="text-lg font-semibold mt-2">
                    {product.title}
                  </h3>
                  <h3 className="text-gray-500 mt-1">{product.name}</h3>
                  <p className="font-semibold mt-2">
                    Rp {product.price}
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

      <Carousel />
    </>
  );
}
