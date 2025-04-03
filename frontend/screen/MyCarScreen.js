import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddCarButton from "../components/MyCar/AddCarButton"; // Import button component

const MyCarScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require("../assets/icons/backButton.png")} style={styles.backButtonImage} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>My cars</Text>

      {/* Car Icon and Message */}
      <View style={styles.content}>
        <Image source={require("../assets/icons/Car.png")} style={styles.carIcon} />
        <Text style={styles.message}>No registered car. Click below to register.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <AddCarButton onPress={() => console.log("Add Car Pressed")} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: 26,
  },
  backButtonImage: {
    width: 63,
    height: 42,
    tintColor: "white", // Adjust color if needed
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    top: 77,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    
  },
  carIcon: {
    width: 80,
    height: 80,
    tintColor: "white", 
  },
  message: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 140, 
    width: "100%",
    alignItems: "center",

  },
});

export default MyCarScreen;
