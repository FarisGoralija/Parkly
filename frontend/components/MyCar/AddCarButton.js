import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AddCarButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>Add car</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#0195F5",
    paddingVertical: 12,
    paddingHorizontal: 140,
    borderRadius: 15,
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default AddCarButton;
