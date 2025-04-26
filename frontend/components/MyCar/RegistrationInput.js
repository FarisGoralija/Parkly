import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const RegistrationInput = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Registration Plate</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter registration plate"
        placeholderTextColor="#ccc"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default RegistrationInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  label: {
    color: "white",
    marginBottom: 8,
    fontSize: 14,
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
