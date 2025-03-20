import React from "react";
import { View, StyleSheet } from "react-native";
import CustomMap from "../components/NearMe/Map"; 

export default function NearMeScreen() {
  return (
    <View style={styles.container}>
      <CustomMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
