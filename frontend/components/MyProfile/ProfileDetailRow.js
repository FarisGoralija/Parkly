import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EyeIcon from "../svg/EyeIcon"; // 👁️ Replace with your actual icon
import { TYPOGRAPHY_COLORS } from "../../constants";

export default function ProfileDetailRow({ icon, label, value, showEye = false }) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {icon}
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
      {showEye && (
        <TouchableOpacity>
          <EyeIcon />
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
  },
  label: {
    color: "#ccc",
    fontSize: 11,
    fontWeight: "700",
  },
  value: {
    color: "#fff",
    fontSize: 15,
    marginTop: 4,
  },
});
