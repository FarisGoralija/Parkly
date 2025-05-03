import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";

export default function AboutUsScreen() {
  return (
    <View style={styles.container}>
      <GrayHeader title="About us" />
      <View style={styles.content}>
        <Text style={styles.text}>
          Welcome to our app! We are dedicated to providing a seamless parking
          reservation experience for all users. Thank you for using our service!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C",
  },
  content: {
    padding: 20,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 24,
  },
});
