import React from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RegistrationInput = ({ value, onChange }) => {
  const formatPlate = (text) => {
    let cleaned = text.toUpperCase().replace(/[^A-Z0-9]/g, ""); // Allow only letters and numbers

    if (cleaned.length > 3 && cleaned[3] !== "-") {
      cleaned = cleaned.slice(0, 3) + "-" + cleaned.slice(3);
    }
    if (cleaned.length > 5 && cleaned[5] !== "-") {
      cleaned = cleaned.slice(0, 5) + "-" + cleaned.slice(5);
    }
    return cleaned;
  };

  const isValidPlate = (plate) => {
    const regex = /^[A-Z][0-9]{2}-[A-Z]-[0-9]{3}$/;
    return regex.test(plate);
  };

  const isValid = isValidPlate(value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Registration Plate</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            { borderColor: value.length > 0 && !isValid ? "#E92440" : "#2C2C2E" },
          ]}
          placeholder="Example: A12-A-345"
          placeholderTextColor="#ccc"
          value={value}
          onChangeText={(text) => onChange(formatPlate(text))}
          autoCapitalize="characters"
          keyboardType="default"
          maxLength={11} // Max possible format length: "A12-A-345"
        />

        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChange("")} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default RegistrationInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    marginBottom: 8,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingRight: 40,
    paddingVertical: 14,
    fontSize: 16,
    color: "white",
    borderWidth: 2,
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});
