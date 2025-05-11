import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import InputField from "../../components/common/InputField.js";
import BlueUniversalButton from "../../components/common/BlueUniversalButton.js";
import TitleText from "../../components/common/TitleText.js";
import { useRegistration } from "../../context/RegistrationContext.js"; // Import the context
import { isValidEmail } from "../../utils/Validation.js";

const RegistrationEmailScreen = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const { updateRegistrationData } = useRegistration(); // Access the context update function
  const navigation = useNavigation(); // Initialize navigation

  const isSubmitDisabled = email.trim() === "";

  // Handle email validation and updating context
  const handleResetPassword = () => {
    if (isValidEmail(email)) {
      setErrorMessage("");
      setIsEmailValid(true);
      updateRegistrationData("email", email); // Store email in context

      // Navigate to the next screen (e.g., RegistrationPasswordScreen)
      navigation.navigate("RegistrationPasswordScreen");
    } else {
      setErrorMessage("Please enter a valid email address.");
      setIsEmailValid(false);
    }
  };

  const handleClearInput = () => {
    setEmail("");
    setErrorMessage("");
    setIsEmailValid(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.titleText}>
          <TitleText
            title="Add E-mail"
            subtitle="Please enter your email to create account."
          />
        </View>

        <View style={[!isEmailValid && styles.inputError]}>
          <InputField
            placeholder="Email"
            value={email}
            placeholderColor="#D2D2D2"
            onChangeText={(text) => {
              setEmail(text);
              if (text.trim() === "") {
                setErrorMessage("");
                setIsEmailValid(true);
              }
            }}
          />
          {email.length > 0 && (
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

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.resetPasswordButton}>
          <BlueUniversalButton
            text="Save email"
            onPress={handleResetPassword}
            disabled={isSubmitDisabled}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "#46474D",
  },
  titleText: {
    marginBottom: 20,
  },
  inputError: {
    borderColor: "#E92440",
    borderRadius: 11,
    borderWidth: 1,
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
  errorText: {
    color: "#E92440",
    fontSize: 13,
    marginTop: 4,
  },
  resetPasswordButton: {
    width: "100%",
    marginTop: 20,
  },
});

export default RegistrationEmailScreen;
