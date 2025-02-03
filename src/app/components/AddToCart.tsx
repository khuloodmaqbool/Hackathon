"use client";
import React, { useCallback, useContext, useState } from "react";
import { TiTick } from "react-icons/ti";
import { CartAmount } from "./CartAmount";
import { CartContext } from "../context/CartContext";

interface ProductType {
  _id: number;
  id: string;
  name: string;
  title: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  category: string;
  price: number;
  tags: string[];
  stock: number;
  offer: string;
}

interface AddToCartProps {
  product: ProductType;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const { colors, sizes, stock } = product;
  const [colorState, setColor] = useState(colors[0]);
  const [sizeState, setSize] = useState(sizes[0]);
  const [amount, setAmount] = useState(1);

  const cartContext = useContext(CartContext);
  const { AddToCartBtn } = cartContext ?? {};

  const increase = useCallback(() => {
    setAmount((prev) => (prev < stock ? prev + 1 : prev));
  }, [stock]);

  const decrease = useCallback(() => {
    setAmount((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (AddToCartBtn) {
      AddToCartBtn({ colorState, sizeState, product, amount });
    }
  }, [AddToCartBtn, colorState, sizeState, product, amount]);

  return (
    <>
      <hr className="my-3" />
      <span className="mb-2 block">Select Color</span>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            className="border-2 border-gray-300 rounded-full w-8 h-8 focus:outline-none flex justify-center items-center"
            onClick={() => setColor(color)}
          >
            {color === colorState && <TiTick style={{ color: "lightgray" }} />}
          </button>
        ))}
      </div>
      <hr className="my-3" />
      <span className="mt-3 mb-2 block">Choose Size</span>
      <div className="flex gap-3 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            className={`py-2 px-4 rounded-full ${
              size === sizeState
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={() => setSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
      <hr className="mt-5" />
      <p className="mt-4">Stock: {stock}</p>

      <div className="flex items-center my-3 mt-6 gap-3 justify-center">
        <CartAmount amount={amount} increase={increase} decrease={decrease} />
        {AddToCartBtn && (
          <button
            onClick={handleAddToCart}
            className="duration-300 flex ml-auto text-white bg-black text-center py-2 px-6 border border-black hover:bg-white hover:text-black rounded-full w-full"
          >
            Add to Cart
          </button>
        )}
      </div>
    </>
  );
};

export default React.memo(AddToCart);
