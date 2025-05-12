import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TitleText from "../../components/common/TitleText";
import InputField from "../../components/common/InputField";
import BlueUniversalButton from "../../components/common/BlueUniversalButton";
import { useRegistration } from "../../context/RegistrationContext"; // Import the context
import { Ionicons } from "@expo/vector-icons";

const RegistrationNameScreen = () => {
  const [name, setName] = useState("");
  const { updateRegistrationData } = useRegistration(); // Access the update function
  const navigation = useNavigation();

  const isSubmitDisabled = name.trim() === "";

  const handleContinue = () => {
    if (isSubmitDisabled) return;

    updateRegistrationData("name", name); // Update context with name
    navigation.navigate("RegistrationUsernameScreen"); // Navigate to the next screen
    console.log("Name Created:", name);
  };

  const handleClearInput = () => {
    setName("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.titleText}>
          <TitleText
            title="Add Name"
            subtitle="Please enter your name and surname to personalize your experience."
          />
        </View>

        <View style={styles.inputWrapper}>
          <InputField
            placeholder="Name"
            placeholderColor="#D2D2D2"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          {name.length > 0 && (
            <TouchableOpacity
              onPress={handleClearInput}
              style={styles.clearIconContainer}
            >
              <Ionicons name="close-circle" size={24} color="#D2D2D2" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.continueButton}>
          <BlueUniversalButton
            text="Continue"
            onPress={handleContinue}
            disabled={isSubmitDisabled}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationNameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "#3A3A3C",
  },
  titleText: {},
  inputWrapper: {
    position: "relative",
  },
  clearIconContainer: {
    position: "absolute",
    right: 10,
    top: 22,
    transform: [{ translateY: -12 }],
  },
  continueButton: {
    width: "100%",
    marginTop: 20,
  },
});
