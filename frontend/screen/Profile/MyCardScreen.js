import React from "react";
import { View, StyleSheet, Text } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";

export default function MyCardScreen() {
  return (
    <View style={styles.container}>
      <GrayHeader title="My cards" />
      <View style={styles.content}>
        <Text style={styles.text}>No cards added yet.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C", // dark background like others
  },
  content: {
    padding: 16,
    marginTop: 60,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
