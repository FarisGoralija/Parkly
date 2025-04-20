import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CarDetailsScreen = () => {
  const navigation = useNavigation();

  const [carType, setCarType] = useState("");
  const [registration, setRegistration] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCar = () => {
    console.log("Car Added:", { carType, registration, description });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image
          source={require("../../assets/icons/backButton.png")}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Add car</Text>

      {/* Image */}
      <Image
        source={require("../../assets/icons/CarGarage.png")} // Replace with your image path
        style={styles.carImage}
      />

      {/* Subtitle */}
      <Text style={styles.sectionTitle}>Car details</Text>
      <Text style={styles.sectionSubtitle}>Enter car information</Text>

      {/* Input fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>CAR TYPE</Text>
        <TextInput
          style={styles.input}
          placeholder="Sedan"
          placeholderTextColor="#ccc"
          value={carType}
          onChangeText={setCarType}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>REGISTRATION TABLE</Text>
        <TextInput
          style={styles.input}
          placeholder="Plate number"
          placeholderTextColor="#ccc"
          value={registration}
          onChangeText={setRegistration}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>DESCRIPTION</Text>
        <TextInput
          style={styles.input}
          placeholder="Car description"
          placeholderTextColor="#ccc"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Add car button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddCar}>
        <Text style={styles.addButtonText}>Add new car</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C",
    paddingHorizontal: 20,
    paddingTop: 56,
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: 26,
  },
  backButtonImage: {
    width: 63,
    height: 42,
    tintColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  carImage: {
    width: "100%",
    height: 160,
    resizeMode: "contain",
    marginTop: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  sectionSubtitle: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: "#ccc",
    fontSize: 13,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#2C2C2E",
    padding: 14,
    borderRadius: 12,
    color: "white",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
