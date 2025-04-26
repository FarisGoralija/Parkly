import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AddCarButton = ({ onPress, style, textStyle, disabled, buttonText = "Add car" }) => {
  return (
    <TouchableOpacity
      style={[styles.addButton, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.addButtonText, textStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#0195F5",
    paddingVertical: 12,
    paddingHorizontal: 20, 
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 20,  
    minWidth: 320,        
    alignItems: "center",  
  },
  addButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default AddCarButton;
