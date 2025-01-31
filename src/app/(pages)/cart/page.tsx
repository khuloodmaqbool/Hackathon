"use client"; 
import { useState, useEffect, useContext } from "react";
import FooterHeader from "@/app/components/FooterHeader";
import HeaderBanner from "@/app/components/HeaderBanner";
import { CartContext } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { CartAmount } from "@/app/components/CartAmount";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";

const Cart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true once on the client side
  }, []);

  const builder = imageUrlBuilder(client);
  const urlFor = (source: SanityImageSource) =>
    builder.image(source).auto("format").fit("max").quality(80).width(600);

  const cartContext = useContext(CartContext);

  if (!isClient) return null; // Prevent rendering on the server

  if (!cartContext) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  const {
    cart,
    removeCartItem,
    increment,
    decrement,
    shipping_fee,
    subtotal_amount,
    clearCartBtn,
  } = cartContext;

  return (
    <>
      <HeaderBanner heading="Cart" />

      <div className="grid grid-cols-1 lg:grid-cols-3 w-11/12 mx-auto gap-6 mt-12">
        {/* Product Table Section */}
        <div className="rounded-xl border px-4 lg:col-span-2 col-span-1">
          {cart.length > 0 ? (
            cart.map(({ id, name, images, color, sizes, price, amount }) => (
              <div key={id} className="py-4">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {images?.length > 0 ? (
                      <Image
                        alt={name}
                        src={urlFor(images[0])?.url()}
                        width={300}
                        height={300}
                        className="w-24 h-20 me-2 object-cover rounded"
                      />
                    ) : (
                      <p className="text-center text-gray-500">
                        No images available
                      </p>
                    )}
                    <div>
                      <p className="font-semibold">{name}</p>
                      <div className="flex items-center space-x-2 my-1">
                        <span className="text-gray-600 text-sm">Color:</span>
                        <div
                          className="rounded-full w-5 h-5 border"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                      <p className="text-gray-600 text-sm">Size: {sizes}</p>
                    </div>
                  </div>
                  {removeCartItem && (
                    <button onClick={() => removeCartItem(id)}>
                      <MdDelete className="text-red-600 w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">Rs {price}</p>
                  {decrement && increment && (
                    <CartAmount
                      amount={amount}
                      increase={() => increment(id)}
                      decrease={() => decrement(id)}
                    />
                  )}
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">Your cart is empty.</p>
          )}
        </div>

        {/* Cart Totals Section */}
        <div className="bg-lightSkin text-center p-8 rounded-lg mt-4 lg:mt-0">
          <h5 className="text-3xl font-semibold mb-6">Cart Totals</h5>

          <div className="grid grid-cols-2 gap-y-6">
            <p>Subtotal</p>
            <p>Rs. {subtotal_amount?.toLocaleString() || "0"}</p>

            <p>Shipping</p>
            <p>Rs. {shipping_fee?.toLocaleString() || "0"}</p>

            <p>Total</p>
            <p className="text-lg text-brownColor font-semibold">
              Rs. {(subtotal_amount + shipping_fee)?.toLocaleString() || "0"}
            </p>
          </div>

          {/* Checkout Button */}
          <Link href="/checkout">
            <button className="mt-6 bg-brownColor text-white px-6 py-3 rounded-lg hover:bg-brownDark">
              Check Out
            </button>
          </Link>

          {/* Clear Cart Button */}
          <button className="mt-4 text-red-500 underline" onClick={clearCartBtn}>
            Clear Cart
          </button>
        </div>
      </div>

      <FooterHeader />
    </>
  );
};

export default Cart;
