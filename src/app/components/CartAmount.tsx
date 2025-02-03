"use client";
import { memo } from "react";

interface PropsType {
  increase: () => void;
  decrease: () => void;
  amount: number;
}

const CartAmountComponent = ({ increase, decrease, amount }: PropsType) => {
  return (
    <div className="flex items-center border border-gray-600 justify-center gap-3 py-1 rounded-lg px-4">
      <button className="text-2xl px-3 py-1 rounded-lg" onClick={decrease}>
        -
      </button>
      <p className="text-lg w-6 text-center">{amount}</p>
      <button className="text-2xl px-3 py-1 rounded-lg" onClick={increase}>
        +
      </button>
    </div>
  );
};

export const CartAmount = memo(CartAmountComponent);
