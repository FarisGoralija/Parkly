import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TitleText from "../../components/common/TitleText";
import InputField from "../../components/common/InputField";
import BlueUniversalButton from "../../components/common/BlueUniversalButton";
import { useRegistration } from "../../context/RegistrationContext"; // Import the context

const RegistrationNameScreen = () => {
  const [name, setName] = useState("");
  const { updateRegistrationData } = useRegistration(); // Access the update function
  const navigation = useNavigation();

  const isSubmitDisabled = name.trim() === "";

  const handleContinue = () => {
    if (isSubmitDisabled) return;

    updateRegistrationData("name", name); // Update context with name
    navigation.navigate("RegistrationUsernameScreen"); // Navigate to the next screen
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
          />
          {name.length > 0 && (
            <TouchableOpacity
              onPress={handleClearInput}
              style={styles.clearIconContainer}
            >
              <Image
                source={require("../../assets/icons/clear.png")}
                style={styles.clearIcon}
              />
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
    backgroundColor: "#46474D",
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
  clearIcon: {
    width: 31,
    height: 26,
  },
  continueButton: {
    width: "100%",
    marginTop: 20,
  },
});
