import React, { useState } from "react";
import { Platform, TouchableOpacity, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // for iOS
import DateTimePicker from "@react-native-community/datetimepicker"; // for Android
 
export default function CustomTimePicker({
  isVisible,
  onClose,
  onConfirm,
  selectedTime,
  theme = "light",
}) {
  const isDark = theme === "dark";
 
  const [androidPickerVisible, setAndroidPickerVisible] = useState(false);
 
  // Android render
  if (Platform.OS === "android" && isVisible) {
    return (
      <DateTimePicker
        value={selectedTime || new Date()}
        mode="time"
        display="default"
        is24Hour={true}
        onChange={(event, date) => {
          setAndroidPickerVisible(false);
          if (event.type === "set" && date) {
            onConfirm(date);
          } else {
            onClose();
          }
        }}
      />
    );
  }
 
  // iOS render
  if (Platform.OS === "ios") {
    return (
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
    );
  }
 
  return null;
}
 
 