"use client";

import { createContext, ReactNode, useEffect, useReducer } from "react";
import productsData from "@/app/products.json";

interface Product {
  id: number;
  name: string;
  title: string;
  shortDescription: string;
  longDescription: string;
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

  useEffect(() => {
    dispatch({ type: "ALL_PRODUCTS", payload: productsData });
  }, []);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
