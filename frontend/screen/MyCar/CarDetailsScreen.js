import React from "react";
import { View, StyleSheet } from "react-native";
import AddCarButton from "../../components/MyCar/AddCarButton";
import GrayHeader from "../../components/common/GrayHeader"; // ✅ Import your header

const CarDetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Gray Header */}
      <GrayHeader title="Add car" />

      {/* Add Car Button */}
      <View style={styles.buttonContainer}>
        <AddCarButton
          onPress={() => {
            // TODO: Add logic to handle adding a car
            console.log("Add new car pressed");
          }}
          style={{ backgroundColor: "white" }}
          textStyle={{ color: "#3A3A3C" }}
        />
      </View>
    </View>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 140,
    width: "100%",
    alignItems: "center",
  },
});
