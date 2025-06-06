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
import { passwordRegex } from "../../utils/Validation";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import endpoints from "../../api/endpoints";
import MiniSpinner from "../../components/Registration/MiniSpinner";

const ForgotNewPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [secureText, setSecureText] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const email = route.params?.email;
  const code = route.params?.code;

  const isSubmitDisabled = password.trim() === "";

  const handlePasswordChange = (text) => {
    setPassword(text);

    if (text.trim() === "") {
      setErrorMessage("");
      setIsPasswordValid(true);
    }
  };

  const handleSavePassword = async () => {
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be 8+ characters, with an uppercase, number, and symbol."
      );
      setIsPasswordValid(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(endpoints.resetPassword, {
        email,
        password,
        code,
      });

      if (response.status === 200) {
        setErrorMessage("");
        setIsPasswordValid(true);
        navigation.navigate("LoginScreen");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to reset password. Try again."
      );
      setIsPasswordValid(false);
    } finally {
      setIsSubmitting(false);
    }
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
            text={isSubmitting ? <MiniSpinner size={18} color="white" /> : "Save Password"}
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
    marginTop: 4,
    marginBottom: 4,
    minHeight: 12,
  },
  savePasswordButton: {
    width: "100%",
  },
});

export default ForgotNewPasswordScreen;
