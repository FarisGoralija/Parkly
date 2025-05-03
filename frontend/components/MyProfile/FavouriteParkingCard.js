import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HeartIcon from "../svg/HeartIcon"; // Make sure this supports `liked` prop

export default function FavouriteParkingCard({ name, price, liked, onToggleLike }) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <TouchableOpacity onPress={onToggleLike}>
        <HeartIcon liked={liked} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 60,
    paddingHorizontal: 22,
    backgroundColor: "#2E2F36",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  left: {
    flexDirection: "column",
  },
  name: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  price: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 4,
  },
});
