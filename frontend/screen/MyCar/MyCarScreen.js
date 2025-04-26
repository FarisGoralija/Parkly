import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import CarCard from "../../components/MyCar/CarCard";
import AddCarButton from "../../components/MyCar/AddCarButton";
import Car from "../../components/svg/Car"; // ✅ Import your Car SVG
import { useCar } from "../../context/CarContext";

const MyCarScreen = ({ navigation }) => {
  const { cars, setCars } = useCar();


  const handleDeleteCar = (index) => {
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    setCars(updatedCars);
  };

  return (
    <View style={styles.container}>
      <GrayHeader title="My cars" />

      {/* If no cars, show big car icon */}
      {cars.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Car width={200} height={200} />
          <Text style={styles.emptyText}>No registered car? Click below button to register.</Text>
        </View>
      ) : (
        <FlatList
          data={cars}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <CarCard
              brand={item.brand}
              model={item.model}
              registration={item.registration}
              onDelete={() => handleDeleteCar(index)}
            />
          )}
          contentContainerStyle={{ paddingTop: 20 }}
        />
      )}

      {/* Add Car Button */}
      <View style={styles.buttonContainer}>
        <AddCarButton
          onPress={() =>
            navigation.navigate("CarDetailsScreen", {
              addCar: (newCar) => setCars((prev) => [...prev, newCar]),
            })
          }
          style={{ backgroundColor: "#0195F5" }}
          textStyle={{ color: "white" }}
        />
      </View>
    </View>
  );
};

export default MyCarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -300, // Pull up little closer to header
  },
  emptyText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 140,
    width: "100%",
    alignItems: "center",
  },
});
