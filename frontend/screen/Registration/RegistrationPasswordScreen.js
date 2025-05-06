import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import TitleText from "../../components/common/TitleText";
import InputField from "../../components/common/InputField";
import BlueUniversalButton from "../../components/common/BlueUniversalButton";
import { passwordRegex } from "../../utils/Validation";
import { Ionicons } from "@expo/vector-icons";
 
const RegistrationPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [secureText, setSecureText] = useState(true);
 
  const route = useRoute();
  const { username } = route.params;
 
  const isSubmitDisabled = password.trim() === "";
 
  const handleCreatePassword = () => {
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be 8+ characters, with an uppercase, number, and symbol."
      );
      setIsValid(false);
      return;
    }
 
    setErrorMessage("");
    setIsValid(true);
    console.log("Password created for user:", username);
    // Proceed with registration or navigation
  };
 
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.titleText}>
          <TitleText
            title="Create new password"
            subtitle="Choose a password with at least 8 characters,
one uppercase letter, one number, and one symbol."
          />
        </View>
 
        <View style={[!isValid && styles.inputError]}>
          <InputField
            placeholder="Password"
            placeholderColor="#D2D2D2"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (text.trim() !== "") {
                setErrorMessage("");
                setIsValid(true);
              }
            }}
            secureTextEntry={secureText}
          />
 
          {password.length > 0 && (
            <>
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
            </>
          )}
        </View>
 
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
 
        <View style={styles.createButton}>
          <BlueUniversalButton
            text="Create Password"
            onPress={handleCreatePassword}
            disabled={isSubmitDisabled}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
 
export default RegistrationPasswordScreen;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "#3D3E45",
  },
  titleText: {},
  inputError: {
    borderColor: "#E92440",
    borderRadius: 11,
    borderWidth: 1,
  },
 
  eyeIconContainer: {
    position: "absolute",
    right: 13,
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