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
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import MiniSpinner from "../../components/Registration/MiniSpinner";
import { useCar } from "../../context/CarContext"; // ✅ Adjust path if needed

const RegistrationPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [secureText, setSecureText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { clearCars } = useCar(); // ✅ Get clear function

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
    setIsLoading(true); // Start loading
    setErrorMessage(""); // Clear previous error

    updateRegistrationData("password", password);
    const userData = { ...registrationData, password };

    fetch(endpoints.registerUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      redirect: "manual",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Registration failed");
        return response.text();
      })
      .then((data) => {
        try {
          const jsonResponse = JSON.parse(data);
          clearCars(); // ✅ Clear cars first
          clearCars(); // 🔁 First reset car context

          AsyncStorage.multiSet([
            ["auth_token", jsonResponse.token],
            ["user", JSON.stringify(jsonResponse.user)],
          ]).then(() => {
            console.log("✅ Token & user saved");
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          });
        } catch (error) {
          setErrorMessage("An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false); // End loading
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
            text={
              isLoading ? (
                <MiniSpinner size={18} color="white" />
              ) : (
                "Save Password"
              )
            }
            onPress={handleSavePassword}
            disabled={isSubmitDisabled || isLoading}
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
