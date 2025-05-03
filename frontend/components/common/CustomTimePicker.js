import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Platform, TouchableOpacity, Text, View } from "react-native";

export default function CustomTimePicker({
  isVisible,
  onClose,
  onConfirm,
  selectedTime,
  theme = "light", // default to light
}) {
  const isDark = theme === "dark";

  return (
    <>
      {Platform.OS === "ios" && (
        <DateTimePickerModal
          isVisible={isVisible}
          mode="time"
          date={selectedTime || new Date()}
          locale="en_GB"
          isDarkModeEnabled={isDark}
          confirmTextIOS="Uredu"
          cancelTextIOS="Odustani"
          onConfirm={onConfirm}
          onCancel={onClose}
          pickerStyleIOS={{
            alignItems: "center",
            backgroundColor: isDark ? "#727272" : "#fff",
          }}
          customConfirmButtonIOS={({ onPress }) => (
            <TouchableOpacity
              onPress={onPress}
              style={{
                height: 50,
                justifyContent: "center",
                borderTopWidth: 1,
                borderTopColor: isDark ? "#444" : "#E0E0E0",
                backgroundColor: isDark ? "#727272" : "white",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: isDark ? "#fff" : "#000",
                }}
              >
                Uredu
              </Text>
            </TouchableOpacity>
          )}
          textColor={isDark ? "#fff" : "#000"}
        />
      )}
    </>
  );
}
