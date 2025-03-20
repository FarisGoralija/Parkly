import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import CustomMap from "../components/NearMe/Map";

export default function NearMeScreen() {
  return (
    
      <View style={styles.mapContainer}>
        <CustomMap />
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
  },
});
