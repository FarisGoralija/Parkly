import React, { createContext, useContext, useState } from "react";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  const addCard = (card) => {
    setCards((prev) => [...prev, card]);
  };

  return (
    <CardContext.Provider value={{ cards, setCards, addCard }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => useContext(CardContext);
