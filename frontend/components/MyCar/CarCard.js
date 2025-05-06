import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Car from "../svg/Car"; // ✅ Use your SVG car icon
import TrashIcon from "../svg/TrashIcon"; // ✅ You should create simple trash svg or use emoji 🗑️

const CarCard = ({ brand, model, registration, onDelete }) => {
  return (
    <View style={styles.card}>
      {/* Car Icon */}
      <View style={styles.carIconContainer}>
        <Car width={30} height={30} />
      </View>

      {/* Car Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{brand}, {model}</Text>
        <Text style={styles.subtitle}>{registration}</Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <TrashIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

export default CarCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2E2F36",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  carIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#5C5C5E",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
});
