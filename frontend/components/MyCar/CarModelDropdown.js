import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const modelsByBrand = {
  BMW: ["X5", "M3", "320i"],
  Audi: ["A4", "Q5", "RS6"],
  Mercedes: ["C-Class", "GLA", "GLE"],
};

const CarModelDropdown = ({ selectedBrand, selectedModel, onModelChange }) => {
  const models = modelsByBrand[selectedBrand] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Model</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedModel}
          onValueChange={(itemValue) => onModelChange(itemValue)}
          style={styles.picker}
          enabled={models.length > 0}
          dropdownIconColor="white"
        >
          <Picker.Item label="Choose model..." value="" />
          {models.map((model, index) => (
            <Picker.Item label={model} value={model} key={index} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CarModelDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  label: {
    color: "white",
    marginBottom: 8,
    fontSize: 14,
  },
  pickerWrapper: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
  },
  picker: {
    color: "white",
    height: 50,
    width: "100%",
  },
});
