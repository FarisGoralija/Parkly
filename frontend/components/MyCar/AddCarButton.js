import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AddCarButton = ({ onPress, disabled, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.addButton,
        style, // 🔥 allow custom style
        disabled && { backgroundColor: "#8AD1FF" }, // 🔥 disabled color override
      ]}
      onPress={onPress}
      disabled={disabled} // 🔥 make it really disabled
    >
      <Text
        style={[
          styles.addButtonText,
          textStyle, // 🔥 allow custom text style
        ]}
      >
        Add car
      </Text>
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
