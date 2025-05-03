import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfileOptionCard({ text, onPress, icon }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.innerContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.label}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 60,
    backgroundColor: "#2E2F36",
    borderRadius: 18,
    marginBottom: 16,
    paddingHorizontal: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%", 
  },
  iconContainer: {
    marginRight: 12,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
