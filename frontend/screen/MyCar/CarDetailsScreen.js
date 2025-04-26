import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import AddCarButton from "../../components/MyCar/AddCarButton";
import CarBrandDropdown from "../../components/MyCar/CarBrandDropdown";
import CarModelDropdown from "../../components/MyCar/CarModelDropdown";
import RegistrationInput from "../../components/MyCar/RegistrationInput"; // ✅ New input field
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const CarDetailsScreen = ({ navigation }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [registrationPlate, setRegistrationPlate] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <GrayHeader title="Add car" />

      {/* Brand dropdown */}
      <View style={[styles.dropdownContainer, { zIndex: 3 }]}>
        <CarBrandDropdown
          selectedBrand={selectedBrand}
          onBrandChange={(value) => {
            setSelectedBrand(value);
            setSelectedModel(null); // reset model when brand changes
          }}
        />
      </View>

      {/* Model dropdown */}
      <View style={[styles.dropdownContainer, { zIndex: 2, marginTop: 10 }]}>
        <CarModelDropdown
          selectedBrand={selectedBrand}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
      </View>

      {/* Registration Plate Input */}
      <View style={[styles.inputContainer, { zIndex: 1, marginTop: 10 }]}>
        <RegistrationInput
          value={registrationPlate}
          onChange={setRegistrationPlate}
        />
      </View>

      {/* Add Car Button */}
      <View style={styles.buttonContainer}>
        <AddCarButton
          onPress={() => {
            console.log("Selected Brand:", selectedBrand);
            console.log("Selected Model:", selectedModel);
            console.log("Registration Plate:", registrationPlate);
          }}
          style={{ backgroundColor: "white" }}
          textStyle={{ color: "#3A3A3C" }}
        />
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C",
  },
  dropdownContainer: {
    paddingHorizontal: 16,
    marginTop: 80,
  },
  inputContainer: {
    paddingHorizontal: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 140,
    width: "100%",
    alignItems: "center",
  },
});
