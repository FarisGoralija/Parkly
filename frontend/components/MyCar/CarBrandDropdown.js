import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const CarBrandDropdown = ({ selectedBrand, onBrandChange }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "BMW", value: "BMW" },
    { label: "Audi", value: "Audi" },
    { label: "Mercedes", value: "Mercedes" },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={selectedBrand}
      items={items}
      setOpen={setOpen}
      setValue={onBrandChange}
      setItems={setItems}
      placeholder="Choose brand"
      style={{
        backgroundColor: "#2C2C2E",
        borderColor: "#2C2C2E",
        marginBottom: 20,
      }}
      textStyle={{
        color: "white",
      }}
      placeholderStyle={{
        color: "#ccc",
      }}
      dropDownContainerStyle={{
        backgroundColor: "#2C2C2E",
        borderColor: "#2C2C2E",
      }}
    />
  );
};

export default CarBrandDropdown;
