"use client";

import { createContext, ReactNode, useEffect, useReducer } from "react";
import { client } from "@/sanity/lib/client"; // Assuming you're using Sanity

interface Product {
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

interface State {
  data: Product[];
  favourites: number[];  // Store the product IDs that are marked as favourite
}

type Action =
  | { type: "ALL_PRODUCTS"; payload: Product[] }
  | { type: "TOGGLE_FAVOURITE"; productId: number };  // Action to toggle favourite

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

interface ChildType {
  children: ReactNode;
}

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ALL_PRODUCTS":
      return { ...state, data: action.payload };
    case "TOGGLE_FAVOURITE":
      const updatedFavourites = state.favourites.includes(action.productId)
        ? state.favourites.filter((id) => id !== action.productId)
        : [...state.favourites, action.productId];
      return { ...state, favourites: updatedFavourites };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: ChildType) => {
  const initialState: State = {
    data: [],
    favourites: [],  // Initialise the favourites array
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchProducts = async () => {
    try {
      const products = await client.fetch(`*[_type == 'product']{
        _id,
        name,
        title,
        description,
        "images": images[].asset._ref,
        colors,
        sizes,
        category,
        price,
        tags,
        stock,
        offer
      }`);
      dispatch({ type: "ALL_PRODUCTS", payload: products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
