import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function ProfileDetailRow({
  icon,
  label,
  value,
  showEye = false,
  editable = false,
  error = "",
  onChangeText = () => {},
  isEditing, // Track if this field is currently being edited
  setIsEditing, // Function to set editing state
}) {
  const [textValue, setTextValue] = useState(value); // State to hold the text input value

  const startEditing = () => {
    setIsEditing(label); // Set the current field as being edited
  };

  const finishEditing = () => {
    setIsEditing(null); // Reset editing state
    onChangeText(textValue); // Update the text value
  };

  useEffect(() => {
    if (!isEditing) {
      setTextValue(value); // Reset value when not in editing mode
    }
  }, [isEditing, value]);

  return (
    <View
      style={[
        styles.row,
        error ? { borderColor: "#FF6B6B", borderWidth: 1 } : {},
      ]}
    >
      <View style={styles.left}>
        {icon}
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.label}>{label}</Text>
          {isEditing === label ? (
            // If this field is being edited, show TextInput
            <TextInput
              style={[styles.value, { color: "#fff" }, styles.editableInput]}
              value={textValue}
              onChangeText={(text) => setTextValue(text)}
              placeholderTextColor="#888"
              onBlur={finishEditing} // Finish editing when blurred
            />
          ) : (
            // If not editing, show Text
            <Text style={styles.value}>{value}</Text>
          )}
        </View>
      </View>

      {/* Pencil icon, appears only if editable and not in editing */}
      {editable && isEditing !== label && (
        <TouchableOpacity onPress={startEditing} style={styles.editIconContainer}>
          <Feather
            name="edit"
            size={18}
            color="#ccc"
            style={styles.editIcon}
          />
        </TouchableOpacity>
      )}

      {/* Checkmark icon after editing */}
      {editable && isEditing === label && (
        <TouchableOpacity onPress={finishEditing} style={styles.editIconContainer}>
          <Feather
            name="check"
            size={18}
            color="#4CAF50"
            style={styles.editIcon}
          />
        </TouchableOpacity>
      )}

      {showEye && (
        <TouchableOpacity>
          <Feather name="eye-off" size={20} color="#ccc" />
        </TouchableOpacity>
      )}

      {/* Adjust the error text position */}
      {error ? (
        <Text style={[styles.errorText, { marginLeft: 12 }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 60,
    paddingHorizontal: 22,
    backgroundColor: "#2E2F36",
    borderRadius: 16,
    flexDirection: "row", // Lay out elements in a row (horizontal)
    alignItems: "center", // Vertically center the row items
    justifyContent: "space-between", // Push items to edges (left and right)
    marginBottom: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Take up all available space, so the pencil can be aligned to the right
  },
  label: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  value: {
    color: "#C7C7C7",
    fontSize: 15,
    marginTop: 4,
  },
  errorText: {
    color: "#FF6B6B",
    position: "absolute",
    fontSize: 11,
    right: 35,
    top: 10,
  },
  editIconContainer: {
    position: "absolute", // Position icon on the right side of the row
    right: 12, // Align it to the right of the row
    top: "50%", // Center it vertically
    transform: [{ translateY: -9 }], // Adjust vertical alignment
  },
  editIcon: {
    // You can add more styling here if you want to tweak the appearance of the pencil icon
  },
  editableInput: {
    borderWidth: 1,
    borderColor: "#555", // Border color to indicate the field is editable
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
});
