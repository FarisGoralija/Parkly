import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TitleText from "../../components/common/TitleText";
import InputField from "../../components/common/InputField";
import BlueUniversalButton from "../../components/common/BlueUniversalButton";
import { passwordRegex } from "../../utils/Validation";

const ForgotNewPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [borderColor, setBorderColor] = useState("#9C9C9C");

  const handlePasswordChange = (text) => {
    setPassword(text);
    setError("");
    setBorderColor("#9C9C9C");
  };

  const handleSavePassword = () => {
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8+ characters, with an uppercase,number, and symbol"
      );
      setBorderColor("#E92440");
      return;
    }

    console.log("Password saved:", password);
    setError("");
    setBorderColor("#00C851");
    // Navigate or trigger success action
  };

  return (
    <View style={styles.container}>
      <TitleText
        title="Create New Password"
        subtitle={`Choose a password with at least 8 characters,\none uppercase letter, one number, and one symbol.`}
      />

      <View>
        <InputField
          placeholder="New Password"
          placeholderColor="#D2D2D2"
          secureTextEntry
          onChangeText={handlePasswordChange}
          borderColor={borderColor}
        />
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={{ height: 15 }} />
      )}

      <View style={styles.savePasswordButton}>
        <BlueUniversalButton
          text="Save Password"
          onPress={handleSavePassword}
          disabled={password.trim() === ""}
        />
      </View>
    </View>
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
  savePasswordButton: {
    width: "100%",
    marginTop: 10,
  },
  errorText: {
    color: "#E92440",
    fontSize: 13,
    marginTop: 10,
    marginLeft: 5,
  },
});

export default ForgotNewPasswordScreen;
