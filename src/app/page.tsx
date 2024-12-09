"use client"
import Image from "next/image";
import HeroSection from "./components/HeroSection";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { MdOutlineCompareArrows } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import Carousel from "./components/Carousel";

export default function Home() {
  const context = useContext(AppContext);

  if (!context) return <p>Loading...</p>;

  const { state } = context;
  const { data } = state;

  const BrowseRange = [
    {
      img: "/images/dining.png",
      title: "Dining",
    },
    {
      img: "/images/living.png",
      title: "Living",
    },
    {
      img: "/images/bedroom.png",
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
        {BrowseRange.map((crnt, ind) => {
          return (
            <>
              <div key={ind} className="mx-auto text-center">
                <img src={crnt.img} alt="" />
                <h1 className="mt-5 font-bold">{crnt.title}</h1>
              </div>
            </>
          );
        })}
      </div>

      <h1 className="text-center font-bold text-3xl mt-12  mb-5 ">Our Products</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6 w-11/12 mx-auto mt-6">
        {data.length > 0 ? (
          data.map((product) => (
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
      <Link className="flex justify-center" href="/shop" >
      <button className="border border-brownColor text-brownColor px-4 py-2 bg-white my-12" >Show More</button>
      </Link>

      <Carousel/>
    </>
  );
}
