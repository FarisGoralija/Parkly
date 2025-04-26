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
    Volkswagen: [
      { label: "Golf", value: "Golf" },
      { label: "Passat", value: "Passat" },
      { label: "Tiguan", value: "Tiguan" },
    ],
    Toyota: [
      { label: "Corolla", value: "Corolla" },
      { label: "RAV4", value: "RAV4" },
      { label: "Yaris", value: "Yaris" },
    ],
    Honda: [
      { label: "Civic", value: "Civic" },
      { label: "CR-V", value: "CR-V" },
      { label: "Accord", value: "Accord" },
    ],
    Hyundai: [
      { label: "i30", value: "i30" },
      { label: "Tucson", value: "Tucson" },
      { label: "Santa Fe", value: "Santa Fe" },
    ],
    Kia: [
      { label: "Sportage", value: "Sportage" },
      { label: "Ceed", value: "Ceed" },
      { label: "Sorento", value: "Sorento" },
    ],
    Ford: [
      { label: "Focus", value: "Focus" },
      { label: "Fiesta", value: "Fiesta" },
      { label: "Kuga", value: "Kuga" },
    ],
    Chevrolet: [
      { label: "Cruze", value: "Cruze" },
      { label: "Malibu", value: "Malibu" },
      { label: "Camaro", value: "Camaro" },
    ],
    Nissan: [
      { label: "Qashqai", value: "Qashqai" },
      { label: "Juke", value: "Juke" },
      { label: "X-Trail", value: "X-Trail" },
    ],
    Peugeot: [
      { label: "208", value: "208" },
      { label: "308", value: "308" },
      { label: "3008", value: "3008" },
    ],
    Renault: [
      { label: "Clio", value: "Clio" },
      { label: "Megane", value: "Megane" },
      { label: "Kadjar", value: "Kadjar" },
    ],
    Fiat: [
      { label: "500", value: "500" },
      { label: "Panda", value: "Panda" },
      { label: "Tipo", value: "Tipo" },
    ],
    Mazda: [
      { label: "CX-5", value: "CX-5" },
      { label: "Mazda3", value: "Mazda3" },
      { label: "MX-5", value: "MX-5" },
    ],
    Jeep: [
      { label: "Renegade", value: "Renegade" },
      { label: "Compass", value: "Compass" },
      { label: "Wrangler", value: "Wrangler" },
    ],
    Subaru: [
      { label: "Forester", value: "Forester" },
      { label: "Outback", value: "Outback" },
      { label: "Impreza", value: "Impreza" },
    ],
    Mitsubishi: [
      { label: "Outlander", value: "Outlander" },
      { label: "ASX", value: "ASX" },
      { label: "Eclipse Cross", value: "Eclipse Cross" },
    ],
    Citroën: [
      { label: "C3", value: "C3" },
      { label: "C4", value: "C4" },
      { label: "C5 Aircross", value: "C5 Aircross" },
    ],
    Volvo: [
      { label: "XC60", value: "XC60" },
      { label: "XC90", value: "XC90" },
      { label: "S60", value: "S60" },
    ],
    Porsche: [
      { label: "911", value: "911" },
      { label: "Cayenne", value: "Cayenne" },
      { label: "Macan", value: "Macan" },
    ],
    Lexus: [
      { label: "RX", value: "RX" },
      { label: "NX", value: "NX" },
      { label: "ES", value: "ES" },
    ],
    
    Opel: [
      { label: "Corsa", value: "Corsa" },
      { label: "Astra", value: "Astra" },
      { label: "Insignia", value: "Insignia" },
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
