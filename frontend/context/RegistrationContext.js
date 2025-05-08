// contexts/RegistrationContext.js
import React, { createContext, useState, useContext } from "react";

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const updateRegistrationData = (field, value) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, updateRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
