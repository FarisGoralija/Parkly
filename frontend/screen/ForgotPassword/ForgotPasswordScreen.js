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
import InputField from "../../components/common/InputField.js";
import BlueUniversalButton from "../../components/common/BlueUniversalButton.js";
import TitleText from "../../components/common/TitleText.js";
import { isValidEmail } from "../../utils/Validation.js";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigation = useNavigation(); 

  const isSubmitDisabled = email.trim() === "";

  const handleResetPassword = () => {
    if (isValidEmail(email)) {
      setErrorMessage("");
      setIsEmailValid(true);
      navigation.navigate("ForgotVerifyCodeScreen", { email }); 
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
            title="Forgot password"
            subtitle="Please enter your email to reset the password"
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
            text="Reset password"
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
    backgroundColor: "white",
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

export default ForgotPasswordScreen;
