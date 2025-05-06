import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal"; // ✅ You missed this import
import GrayHeader from "../../components/common/GrayHeader";
import CarCard from "../../components/MyCar/CarCard";
import AddCarButton from "../../components/MyCar/AddCarButton";
import Car from "../../components/svg/Car";
import { useCar } from "../../context/CarContext";

const MyCarScreen = ({ navigation }) => {
  const { cars, setCars } = useCar();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);

  const confirmDeleteCar = (index) => {
    setSelectedDeleteIndex(index);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmedDelete = () => {
    const updatedCars = [...cars];
    updatedCars.splice(selectedDeleteIndex, 1);
    setCars(updatedCars);
    setIsDeleteModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <GrayHeader title="My cars" />

      {cars.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Car width={200} height={200} />
          <Text style={styles.emptyText}>
            No registered car? Click below button to register.
          </Text>
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
              onDelete={() => confirmDeleteCar(index)}
            />
          )}
          contentContainerStyle={{ paddingTop: 20 }}
        />
      )}

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

      {/* Delete Confirmation Modal */}
      <Modal
        isVisible={isDeleteModalVisible}
        backdropOpacity={0.4}
        onBackdropPress={() => setIsDeleteModalVisible(false)}
        useNativeDriver
      >
        <View
          style={{
            backgroundColor: "#F9F9F9",
            borderRadius: 20,
            padding: 25,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
            Delete this car?
          </Text>
          <Text style={{ fontSize: 16, color: "#333", marginBottom: 20 }}>
            Are you sure you want to remove this car from your list?
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              onPress={() => setIsDeleteModalVisible(false)}
              style={{
                backgroundColor: "#E5E5EA",
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#000", fontWeight: "600" }}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleConfirmedDelete}
              style={{
                backgroundColor: "#0195F5",
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginTop: -300,
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
