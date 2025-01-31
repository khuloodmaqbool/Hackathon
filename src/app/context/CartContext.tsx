"use client";

import { createContext, useEffect, useReducer, ReactNode } from "react";

// Interfaces
interface CartItem {
  id: string;
  images: string[];
  name: string;
  color: string;
  amount: number;
  price: number;
  sizes: string;
  stock: number;
}

interface CartState {
  cart: CartItem[];
  total_cart_item: number;
  shipping_fee: number;
  subtotal_amount: number;
}

interface AddToCartPayload {
  colorState: string;
  sizeState: string;
  product: {
    id: string;
    images: string[];
    name: string;
    price: number;
    stock: number;
  };
  amount: number;
}

interface CartContextData {
  cart: CartItem[];
  total_cart_item: number;
  shipping_fee: number;
  subtotal_amount: number;
  AddToCartBtn: (payload: AddToCartPayload) => void;
  removeCartItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCartBtn: () => void;
}

// Action Interface
type CartAction =
  | { type: "SET_CART_FROM_STORAGE"; payload: CartItem[] }
  | { type: "ADD_TO_CART"; payload: AddToCartPayload }
  | { type: "SET_DECREMENT"; payload: string }
  | { type: "SET_INCREMENT"; payload: string }
  | { type: "REMOVE_CART_ITEM"; payload: string }
  | { type: "CLEAR_CART_BTN" }
  | { type: "TOTAL_CART_TOTAL" }
  | { type: "SET_SUBTOTAL" };

// Context Creation
export const CartContext = createContext<CartContextData | undefined>(undefined);

// Reducer Function
const reducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_CART_FROM_STORAGE":
      return { ...state, cart: action.payload };

    case "ADD_TO_CART":
      const { colorState, sizeState, product, amount } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.id === product.id + colorState + sizeState
      );

      if (existingItem) {
        const updatedCart = state.cart.map((item) =>
          item.id === product.id + colorState + sizeState
            ? { ...item, amount: Math.min(item.amount + amount, item.stock) }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        const newCartItem: CartItem = {
          id: product.id + colorState + sizeState,
          images: product.images,
          name: product.name,
          color: colorState,
          amount: amount,
          price: product.price,
          sizes: sizeState,
          stock: product.stock,
        };
        return { ...state, cart: [...state.cart, newCartItem] };
      }

    case "SET_DECREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, amount: Math.max(1, item.amount - 1) }
            : item
        ),
      };

    case "SET_INCREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, amount: Math.min(item.amount + 1, item.stock) }
            : item
        ),
      };

    case "REMOVE_CART_ITEM":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

    case "CLEAR_CART_BTN":
      return { ...state, cart: [] };

    case "TOTAL_CART_TOTAL":
      return { ...state, total_cart_item: state.cart.reduce((acc, item) => acc + item.amount, 0) };

    case "SET_SUBTOTAL":
      return { ...state, subtotal_amount: state.cart.reduce((acc, item) => acc + item.price * item.amount, 0) };

    default:
      return state;
  }
};

// Helper Function to Get Cart Items from Local Storage
const getCartItemsFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const items = localStorage.getItem("set_Cart_Item");
    return items ? JSON.parse(items) : [];
  }
  return [];
};

// CartProvider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    cart: getCartItemsFromLocalStorage(),
    total_cart_item: 0,
    shipping_fee: 300,
    subtotal_amount: 0,
  });

  // Load Cart Items from Local Storage After Mounting
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("set_Cart_Item");
      if (storedCart) {
        dispatch({ type: "SET_CART_FROM_STORAGE", payload: JSON.parse(storedCart) });
      }
    }
  }, []);

  // Update Local Storage and Derived State
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("set_Cart_Item", JSON.stringify(state.cart));
    }
    dispatch({ type: "TOTAL_CART_TOTAL" });
    dispatch({ type: "SET_SUBTOTAL" });
  }, [state.cart]);

  // Action Creators
  const AddToCartBtn = (payload: AddToCartPayload) => {
    dispatch({ type: "ADD_TO_CART", payload });
  };

  const removeCartItem = (id: string) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
  };

  const clearCartBtn = () => {
    dispatch({ type: "CLEAR_CART_BTN" });
  };

  const decrement = (id: string) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const increment = (id: string) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        AddToCartBtn,
        removeCartItem,
        increment,
        decrement,
        clearCartBtn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
