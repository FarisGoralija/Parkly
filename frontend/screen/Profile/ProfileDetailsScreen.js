import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";

export default function ProfileDetailsScreen() {
  return (
    <View style={styles.container}>
      <GrayHeader title="Profile Details" />
      <View style={styles.content}>
        <Text style={styles.text}>Your profile details go here.</Text>
        {/* Add more form fields or info as needed */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C", // Dark background
  },
  content: {
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
