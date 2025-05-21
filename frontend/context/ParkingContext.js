import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import endpoints from "../api/endpoints"; // adjust if needed
 
const ParkingContext = createContext();
 
export const ParkingProvider = ({ children }) => {
  const [activeParking, setActiveParking] = useState(null);
  const [favoriteParkings, setFavoriteParkings] = useState([]);
 
  const loadFavorites = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (!token) return;
 
      const res = await axios.get(endpoints.getFavorites, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
 
      const favorites = Array.isArray(res.data)
        ? res.data
        : res.data.favorites || [];
 
      setFavoriteParkings(favorites);
    } catch (err) {
      console.error("❌ Failed to load favorites:", err.response?.data || err.message);
    }
  };
 
  const toggleFavorite = async (location) => {
    if (!location || !location.id) return;
 
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (!token) return;
 
      await axios.post(
        endpoints.toggleFavorite,
        { parking_id: location.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
 
      setFavoriteParkings((prev) => {
        const exists = prev.find((p) => p.id === location.id);
        return exists
          ? prev.filter((p) => p.id !== location.id)
          : [...prev, location];
      });
    } catch (err) {
      console.error("❌ Failed to toggle favorite:", err.response?.data || err.message);
    }
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
        loadFavorites,
      }}
>
      {children}
</ParkingContext.Provider>
  );
};
 
export const useParking = () => useContext(ParkingContext);