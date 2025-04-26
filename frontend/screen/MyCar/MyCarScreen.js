import React from "react";
import { View, StyleSheet, Text } from "react-native"; // ✅ Import Text!
import AddCarButton from "../../components/MyCar/AddCarButton";
import GrayHeader from "../../components/common/GrayHeader";
import Car from "../../components/svg/car"; 

const MyCarScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Gray Header */}
      <GrayHeader title="My cars" />

      {/* Centered Car Icon and Message */}
      <View style={styles.carIconContainer}>
        <Car width={200} height={200} />
        <Text style={styles.messageText}>
          No registered car? Click below button to register
        </Text>
      </View>

      {/* Add Car Button */}
      <View style={styles.buttonContainer}>
        <AddCarButton
          onPress={() => navigation.navigate("CarDetailsScreen")}
          style={{ backgroundColor: "white" }}
          textStyle={{ color: "#3A3A3C" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C",
  },
  carIconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 150,
  },
  messageText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20, // ✅ safe padding for smaller devices
  },
  buttonContainer: {
    position: "absolute",
    bottom: 140,
    width: "100%",
    alignItems: "center",
  },
});

export default MyCarScreen;
