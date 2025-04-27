import React, { createContext, useState, useContext } from "react";

// 1. Create Context
const ParkingContext = createContext();

// 2. Create Provider
export const ParkingProvider = ({ children }) => {
  const [activeParking, setActiveParking] = useState(null);

  return (
    <ParkingContext.Provider value={{ activeParking, setActiveParking }}>
      {children}
    </ParkingContext.Provider>
  );
};

// 3. Create custom hook (easier to use)
export const useParking = () => useContext(ParkingContext);
