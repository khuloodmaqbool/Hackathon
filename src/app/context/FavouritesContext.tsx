// contexts/FavouritesContext.tsx
"use client"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface FavouritesContextType {
  favourites: number[]; // Array of product IDs
  toggleFavourite: (productId: number) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};

interface ChildType {
  children: ReactNode;
}
export const FavouritesProvider = ({ children }: ChildType) => {
  const [favourites, setFavourites] = useState<number[]>([]);

  // Fetch favourites from localStorage if available
  useEffect(() => {
    const savedFavourites = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );
    setFavourites(savedFavourites);
  }, []);

  // Function to toggle favourite status
  const toggleFavourite = (productId: number) => {
    let updatedFavourites = [...favourites];
    if (favourites.includes(productId)) {
      updatedFavourites = updatedFavourites.filter((id) => id !== productId);
    } else {
      updatedFavourites.push(productId);
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites)); // Save to localStorage
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};
