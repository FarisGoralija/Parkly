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
import { useNavigation } from "@react-navigation/native";
import TitleText from "../../components/common/TitleText";
import InputField from "../../components/common/InputField";
import BlueUniversalButton from "../../components/common/BlueUniversalButton";
import { useRegistration } from "../../context/RegistrationContext"; // Import the context
import { isValidUsername } from "../../utils/Validation"; // Import the validation utility
import { Ionicons } from "@expo/vector-icons";
import endpoints from "../../api/endpoints"; 

const RegistrationUsernameScreen = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { updateRegistrationData } = useRegistration(); // Access the context update function
  const navigation = useNavigation();

  const isSubmitDisabled = username.trim() === "";

  const handleCreateUsername = async () => {
  const result = isValidUsername(username);

  if (!result.valid) {
    setErrorMessage(result.message);
    setIsValid(false);
    return;
  }

  try {
    const response = await fetch(
      `${endpoints.checkUsername}?username=${encodeURIComponent(username)}`
    );
    const data = await response.json();

    if (data.exists) {
      setErrorMessage("This username is already taken.");
      setIsValid(false);
    } else {
      setErrorMessage("");
      setIsValid(true);
      updateRegistrationData("username", username);
      navigation.navigate("RegistrationEmailScreen");
    }
  } catch (error) {
    console.error("Username check failed", error);
    setErrorMessage("Error checking username. Please try again.");
    setIsValid(false);
  }
};
  // Clear input field
  const handleClearInput = () => {
    setUsername("");
    setErrorMessage("");
    setIsValid(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.titleText}>
          <TitleText
            title="Create Username"
            subtitle={
              "Choose a username for your new account. \nYou can always change it later."
            }
          />
        </View>

        <View style={[!isValid && styles.inputError]}>
          <InputField
            placeholder="Username"
            placeholderColor="#D2D2D2"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              // Clear error when the user starts typing
              if (text.trim() !== "") {
                setErrorMessage("");
                setIsValid(true);
              }
            }}
          />
          {username.length > 0 && (
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

        <View style={styles.createButton}>
          <BlueUniversalButton
            text="Create Username"
            onPress={handleCreateUsername} // Validation happens here
            disabled={isSubmitDisabled}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationUsernameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "#3A3A3C",
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
  createButton: {
    width: "100%",
    marginTop: 20,
  },
});
