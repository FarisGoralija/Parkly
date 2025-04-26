import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const RegistrationInput = ({ value, onChange }) => {
  return (
    <View>
      <Text style={styles.label}>Registration Plate</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter registration plate"
        placeholderTextColor="#ccc"
        value={value}
        onChangeText={(text) => onChange(text.toUpperCase())}
        autoCapitalize="characters"
      />
    </View>
  );
};

export default RegistrationInput;

const styles = StyleSheet.create({
  label: {
    color: "white",
    marginBottom: 8,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  input: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 16,
    fontSize: 16,
    color: "white",
  },
});
