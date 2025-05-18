import React, { createContext, useState, useContext } from "react";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);

  const clearCars = () => {
   
    setCars([]);
  };

  return (
    <CarContext.Provider value={{ cars, setCars, clearCars }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCar = () => useContext(CarContext);
