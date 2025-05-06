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
import { isValidUsername } from "../../utils/Validation"; // Import the validation utility

const RegistrationUsernameScreen = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigation = useNavigation();

  const isSubmitDisabled = username.trim() === "";

  // Handle username creation and validation
  const handleCreateUsername = () => {
    const result = isValidUsername(username); // Check the validity only when button is pressed

    if (result.valid) {
      setErrorMessage("");
      setIsValid(true);
      console.log("Username created:", username);
      // Navigate to the next screen (RegistrationPasswordScreen)
      navigation.navigate("RegistrationPasswordScreen", { username }); // Pass username to the next screen
    } else {
      setErrorMessage(result.message); // Display error message
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
    backgroundColor: "#3D3E45",
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
  createButton: {
    width: "100%",
    marginTop: 20,
  },
});
