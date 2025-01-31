"use client";
import { useContext, useState } from "react";
import { TiTick } from "react-icons/ti";
import { CartAmount } from "./CartAmount";
import { CartContext } from "../context/CartContext";

interface ProductType {
  _id: number;
  id: string;
  name: string;
  title: string;
  // shortDescription: string;
  // longDescription: string;
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



interface ObjType {
  product: ProductType;
}

const AddToCart = ({ product }: ObjType) => {
  const { colors, sizes, stock } = product;
  const [colorState, setColor] = useState(colors[0]);
  const [sizeState, setSize] = useState(sizes[0]);
  const [amount, setAmount] = useState(1);

  const { AddToCartBtn } = useContext(CartContext) ?? {};

  console.log("ADD TO CART LOG" + AddToCart);

  const increase = () => {
    if (amount < stock) {
      setAmount(amount + 1);
    }
  };

  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  console.log("cart details" + colorState, sizeState, product, amount);
  return (
    <>
      <hr className="my-3" />
      <span className="mb-2">Select Color</span>
      <div className="flex gap-3">
        {colors.map((crntEle) => {
          return (
            <button
              key={crntEle}
              style={{ backgroundColor: crntEle }}
              className="border-2 border-gray-300 rounded-full w-8 h-8 focus:outline-none flex justify-center items-center"
              onClick={() => setColor(crntEle)}
            >
              {crntEle === colorState ? (
                <TiTick style={{ color: "lightgray" }} />
              ) : null}
            </button>
          );
        })}
      </div>
      <hr className="my-3" />
      <span className="mt-3 mb-2">Choose Size</span>
      <div className="flex gap-3 flex-wrap">
        {sizes.map((crntEle) => {
          return (
            <button
              key={crntEle}
              className={`py-2 px-4 rounded-full ${
                crntEle === sizeState
                  ? "bg-black text-white"
                  : "bg-gray-100 text-grey-500"
              }`}
              onClick={() => setSize(crntEle)}
            >
              {crntEle}
            </button>
          );
        })}
      </div>
      <hr className="mt-5" />
      <p className="mt-4">Stock {product.stock}</p>

      <div className="flex items-center my-3 mt-6 gap-3 justify-center">
        <CartAmount amount={amount} increase={increase} decrease={decrease} />

        {AddToCartBtn && (
          <button
            onClick={() =>
              AddToCartBtn({ colorState, sizeState, product, amount })
            }
            className="duration-300 flex ml-auto text-white h-fit bg-black text-center py-2 px-6 border border-black hover:bg-white hover:text-black rounded-full w-full"
          >
            Add to Cart
          </button>
        )}
      </div>
    </>
  );
};

export default AddToCart;
