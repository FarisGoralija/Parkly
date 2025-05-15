import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import GrayHeader from "../../components/common/GrayHeader";
import AddCarButton from "../../components/MyCar/AddCarButton";
import CarBrandDropdown from "../../components/MyCar/CarBrandDropdown";
import CarModelDropdown from "../../components/MyCar/CarModelDropdown";
import RegistrationInput from "../../components/MyCar/RegistrationInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import endpoints from "../../api/endpoints";

const CarDetailsScreen = ({ navigation }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [registrationPlate, setRegistrationPlate] = useState("");
  const { addCar } =
    navigation.getState()?.routes?.find((r) => r.name === "CarDetailsScreen")
      ?.params || {};

  // ✅ Check if registration plate format is valid
  const isValidPlate = (plate) => {
    const regex = /^[A-Z][0-9]{2}-[A-Z]-[0-9]{3}$/;
    return regex.test(plate);
  };

  // ✅ Form is valid if all 3 fields are properly entered
  const isFormValid =
    selectedBrand && selectedModel && isValidPlate(registrationPlate);

  const handleAddCar = async () => {
    console.log("🟡 Add Car button clicked");

    try {
      const token = await AsyncStorage.getItem("auth_token");
      const user = JSON.parse(await AsyncStorage.getItem("user"));

      if (!user?.id || !token) {
        console.warn("🚫 Missing user or token");
        return;
      }

      const carData = {
        brand: selectedBrand,
        model: selectedModel,
        license_plate: registrationPlate,
      };

      console.log("📦 Sending car data:", carData);

      const response = await fetch(endpoints.addUserCar(user.id), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Failed to add car:", errorData);
        return;
      }

      const newCar = await response.json();
      console.log("✅ Car added:", newCar);

      // Update global car context (optional)
      if (addCar) {
        addCar(newCar);
      }

      navigation.goBack();
    } catch (err) {
      console.error("🔥 Error adding car:", err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* Gray header */}
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
            onPress={handleAddCar}
            disabled={!isFormValid}
            style={{
              backgroundColor: isFormValid ? "#0195F5" : "#8AD1FF", // ✅ Correct colors
            }}
            textStyle={{
              color: "white",
            }}
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
    marginTop: 80, // margin under header
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
