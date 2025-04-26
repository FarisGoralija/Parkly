import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CarBrandDropdown = ({ selectedBrand, onBrandChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Brand</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedBrand}
          onValueChange={(itemValue) => onBrandChange(itemValue)}
          style={styles.picker}
          dropdownIconColor="white"
        >
          <Picker.Item label="Choose brand..." value="" />
          <Picker.Item label="BMW" value="BMW" />
          <Picker.Item label="Audi" value="Audi" />
          <Picker.Item label="Mercedes" value="Mercedes" />
          {/* Add more brands */}
        </Picker>
      </View>
    </View>
  );
};

export default CarBrandDropdown;

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
