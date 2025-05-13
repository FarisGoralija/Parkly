import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BlueUniversalButton from "../common/BlueUniversalButton";
import Feather from "react-native-vector-icons/Feather"; // Make sure this is installed

export default function EditFieldModal({
  visible,
  fieldLabel,
  value,
  onChangeText,
  onSave,
  onClose,
  error,
}) {
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={20} color="#ccc" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Change {fieldLabel}</Text>
          <TextInput
            style={styles.modalInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={`Enter ${fieldLabel.toLowerCase()}`}
            placeholderTextColor="#aaa"
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <BlueUniversalButton style={styles.modalButton} onPress={onSave} text={"Save"} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#2E2F36",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
    zIndex: 10,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "600",
    textAlign: "left",
    paddingRight: 30, // to avoid overlapping with close icon
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 6,
    padding: 10,
    color: "#fff",
    marginBottom: 12,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  errorText: {
    color: "#FF6B6B",
    marginBottom: 8,
  },
});
