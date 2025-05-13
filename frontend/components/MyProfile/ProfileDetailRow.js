import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function ProfileDetailRow({ icon, label, value, editable = false, onPressEdit }) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {icon}
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>

      {editable && (
        <TouchableOpacity onPress={onPressEdit} style={styles.editIconContainer}>
          <Feather name="edit" size={18} color="#ccc" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 60,
    paddingHorizontal: 22,
    backgroundColor: "#2E2F36",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
  editIconContainer: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -9 }],
  },
});
