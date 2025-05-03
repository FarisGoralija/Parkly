import React, { createContext, useContext, useState } from "react";

// 1. Create context
const ParkingContext = createContext();

// 2. Provider
export const ParkingProvider = ({ children }) => {
  const [activeParking, setActiveParking] = useState(null);
  const [favoriteParkings, setFavoriteParkings] = useState([]);

  const toggleFavorite = (location) => {
    if (!location || !location.id) return;

    setFavoriteParkings((prev) => {
      const exists = prev.find((p) => p.id === location.id);
      if (exists) {
        return prev.filter((p) => p.id !== location.id);
      } else {
        return [...prev, location];
      }
    });
  };

  const isFavorited = (location) => {
    if (!location || !location.id) return false;
    return favoriteParkings.some((p) => p.id === location.id);
  };

  return (
    <ParkingContext.Provider
      value={{
        activeParking,
        setActiveParking,
        favoriteParkings,
        toggleFavorite,
        isFavorited,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

// 3. Hook
export const useParking = () => useContext(ParkingContext);
