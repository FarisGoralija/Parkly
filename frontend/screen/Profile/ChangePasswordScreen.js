import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/common/InputField";
import BlueUniversalButton from "../../components/common/BlueUniversalButton";
import TitleText from "../../components/common/TitleText";
import { useRegistration } from "../../context/RegistrationContext";
import Ionicons from "react-native-vector-icons/Ionicons";

const ChangePasswordScreen = () => {
  const { updateRegistrationData } = useRegistration();
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [secureCurrent, setSecureCurrent] = useState(true);
  const [secureNew, setSecureNew] = useState(true);

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      setErrorMessage("Password should be at least 6 characters.");
      return;
    }

    setErrorMessage("");
    updateRegistrationData("password", newPassword);
    navigation.goBack();
  };

  const isSubmitDisabled = newPassword.trim() === "";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.titleText}>
          <TitleText
            title="Change Password"
            subtitle="Please enter your new password."
          />
        </View>

        {/* Current Password */}
        <View style={styles.inputWrapper}>
          <InputField
            placeholder="Current Password"
            value={currentPassword}
            placeholderColor="#D2D2D2"
            onChangeText={setCurrentPassword}
            secureTextEntry={secureCurrent}
          />
          {currentPassword.length > 0 && (
            <TouchableOpacity
              onPress={() => setSecureCurrent(!secureCurrent)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={secureCurrent ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputWrapper}>
          <InputField
            placeholder="New Password"
            value={newPassword}
            placeholderColor="#D2D2D2"
            onChangeText={(text) => {
              setNewPassword(text);
              if (text.length >= 6 || text.length === 0) {
                setErrorMessage("");
              }
            }}
            secureTextEntry={secureNew}
          />
          {newPassword.length > 0 && (
            <TouchableOpacity
              onPress={() => setSecureNew(!secureNew)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={secureNew ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}
          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
        </View>

        <View style={styles.changePasswordButton}>
          <BlueUniversalButton
            text="Save New Password"
            onPress={handleChangePassword}
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
    marginBottom: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 35,
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 10,
  },
  errorText: {
    color: "#E92440",
    fontSize: 13,
    marginTop: 4,
  },
  changePasswordButton: {
    width: "100%",
    marginTop: 15,
  },
});

export default ChangePasswordScreen;
