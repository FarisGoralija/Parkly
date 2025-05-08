import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import TitleText from "../../components/common/TitleText";
import InputField from "../../components/common/InputField";
import BlueUniversalButton from "../../components/common/BlueUniversalButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRegistration } from "../../context/RegistrationContext"; // Import the context
import endpoints from "../../api/endpoints"; // Import endpoints.js

const RegistrationPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [secureText, setSecureText] = useState(true);
  const { updateRegistrationData, registrationData } = useRegistration(); // Access the context update function
  const navigation = useNavigation();

  const isSubmitDisabled = password.trim() === "";

  const handlePasswordChange = (text) => {
    setPassword(text);

    if (text.trim() === "") {
      setErrorMessage("");
      setIsPasswordValid(true);
    }
  };

  const handleSavePassword = () => {
    // Save password in context
    updateRegistrationData("password", password);

    // Merge data from context with the password
    const userData = { ...registrationData, password };

    // Send the registration data to the API
    fetch(endpoints.registerUser, {  // Use the registerUser endpoint from endpoints.js
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      redirect: "manual", // Disable automatic redirects
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("Registration failed");
        }
        return response.text(); // Get the raw response as text
      })
      .then((data) => {
        console.log("Raw response data:", data); // Log the raw response to check if it's HTML
        try {
          const jsonResponse = JSON.parse(data); // Try parsing as JSON
          console.log("Parsed JSON:", jsonResponse);

          // After successful registration, navigate to the success screen
          navigation.navigate("LoginScreen");
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setErrorMessage("An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setErrorMessage("An error occurred. Please try again.");
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.titleText}>
          <TitleText
            title="Create New Password"
            subtitle={`Choose a password with at least 8 characters,\none uppercase letter, one number, and one symbol.`}
          />
        </View>

        <View style={styles.inputBlock}>
          <View
            style={[styles.inputWrapper, !isPasswordValid && styles.inputError]}
          >
            <InputField
              placeholder="New Password"
              placeholderColor="#D2D2D2"
              secureTextEntry={secureText}
              onChangeText={handlePasswordChange}
              textStyle={{ color: "white" }}
            />
            {password.length > 0 && (
              <TouchableOpacity
                onPress={() => setSecureText(!secureText)}
                style={styles.eyeIconContainer}
              >
                <Ionicons
                  name={secureText ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Always reserve space for error message */}
          <Text style={styles.errorText}>
            {errorMessage ? errorMessage : " "}
          </Text>
        </View>

        <View style={styles.savePasswordButton}>
          <BlueUniversalButton
            text="Save Password"
            onPress={handleSavePassword}
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

  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  eyeIconContainer: {
    position: "absolute",
    right: 35,
    top: 11,
    zIndex: 1,
  },
  inputError: {
    borderColor: "#E92440",
    borderRadius: 11,
    borderWidth: 1,
  },
  errorText: {
    color: "#E92440",
    fontSize: 13,
    marginTop: 2,
    marginBottom: 2,
    minHeight: 12,
  },
  savePasswordButton: {
    width: "100%",
  },
});

export default RegistrationPasswordScreen;
