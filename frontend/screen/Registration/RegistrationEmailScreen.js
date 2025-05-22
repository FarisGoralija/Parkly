import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/common/InputField.js";
import BlueUniversalButton from "../../components/common/BlueUniversalButton.js";
import TitleText from "../../components/common/TitleText.js";
import { useRegistration } from "../../context/RegistrationContext.js";
import { isValidEmail } from "../../utils/Validation.js";
import { Ionicons } from "@expo/vector-icons";
import endpoints from "../../api/endpoints"; // ✅ Import endpoints

const RegistrationEmailScreen = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const { updateRegistrationData } = useRegistration();
  const navigation = useNavigation();

  const isSubmitDisabled = email.trim() === "";

  // ✅ Async email validation with backend
  const handleResetPassword = async () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setIsEmailValid(false);
      return;
    }

    try {
      const response = await fetch(
        `${endpoints.checkEmail}?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();

      if (data.exists) {
        setErrorMessage("This email is already registered.");
        setIsEmailValid(false);
      } else {
        setErrorMessage("");
        setIsEmailValid(true);
        updateRegistrationData("email", email);
        console.log("Email created:", email);
        navigation.navigate("RegistrationPasswordScreen");
      }
    } catch (error) {
      console.error("Email check failed", error);
      setErrorMessage("Error checking email. Please try again.");
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
              <Ionicons name="close-circle" size={24} color="#D2D2D2" />
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
    backgroundColor: "#3A3A3C",
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
