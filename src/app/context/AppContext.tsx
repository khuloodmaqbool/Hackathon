"use client";

import { createContext, ReactNode, useEffect, useReducer } from "react";
import { client } from "@/sanity/lib/client"; // Assuming you're using Sanity

interface Product {
  _id: number;
  id: string;
  name: string;
  title: string;
  description:string;
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
}

type Action = { type: "ALL_PRODUCTS"; payload: Product[] };

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
    default:
      return state;
  }
};

export const AppProvider = ({ children }: ChildType) => {
  const initialState: State = {
    data: [],
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchProducts = async () => {
    try {
      const products = await client.fetch(`*[_type == 'product']{
        _id,
        name,
        title,
        // shortDescription,
        // longDescription,
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

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
