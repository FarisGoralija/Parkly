import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ActiveParkingCard = ({ location, price, carModel, registration, duration }) => {
  return (
    <View style={styles.card}>
      {/* Top row: Location and Price */}
      <View style={styles.topRow}>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.priceText}>Price: {price}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom row: Car Info and Duration */}
      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.carModelText}>{carModel}</Text>
          <Text style={styles.registrationText}>{registration}</Text>
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.durationLabel}>Duration:</Text>
          <Text style={styles.durationText}>{duration}</Text>
        </View>
      </View>
    </View>
  );
};

export default ActiveParkingCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2C2C2E",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 20,
    width: "90%",
    height: 75, // ✅ fixed height
    alignSelf: "center",
    justifyContent: "center", // ✅ center everything vertically
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  priceText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "white",
    marginVertical: 4, // ✅ make divider take less vertical space
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4, // ✅ slight margin to separate from divider
  },
  carModelText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  registrationText: {
    color: "white",
    fontSize: 13,
  },
  durationContainer: {
    alignItems: "flex-end",
  },
  durationLabel: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  durationText: {
    color: "white",
    fontSize: 13,
  },
});
