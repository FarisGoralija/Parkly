import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text } from "react-native";

const CarModelDropdown = ({ selectedBrand, selectedModel, onModelChange }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const modelsByBrand = {
    BMW: [
      { label: "X5", value: "X5" },
      { label: "M3", value: "M3" },
      { label: "320i", value: "320i" },
    ],
    Audi: [
      { label: "A4", value: "A4" },
      { label: "Q5", value: "Q5" },
      { label: "RS6", value: "RS6" },
    ],
    Mercedes: [
      { label: "C-Class", value: "C-Class" },
      { label: "GLA", value: "GLA" },
      { label: "GLE", value: "GLE" },
    ],
  };

  useEffect(() => {
    if (selectedBrand) {
      setItems(modelsByBrand[selectedBrand] || []);
    } else {
      setItems([]);
    }
  }, [selectedBrand]);

  return (
     <View style={{ marginBottom: 0 }}>
      <Text style={{ color: "white", fontSize: 14, marginBottom: 8 }}>Select Car Model</Text>
    <DropDownPicker
      open={open}
      value={selectedModel}
      items={items}
      setOpen={setOpen}
      setValue={onModelChange}
      setItems={setItems}
      placeholder="Choose model"
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
      disabled={!selectedBrand} // 🔥 Disable if no brand selected
    />
    </View>
  );
};

export default CarModelDropdown;
