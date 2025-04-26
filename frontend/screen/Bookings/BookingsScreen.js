import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import TabsSwitcher from "../../components/Booking/TabsSwitcher";
import AddCarButton from "../../components/MyCar/AddCarButton";
import NearMeScreen from "../../screen/NearMeScreen";
import ActiveParkingCard from "../../components/Booking/ActiveParkingCard"; // ✅ Import!

export default function BookingsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Active");

  // Example parking object
  const [activeParking, setActiveParking] = useState({
    location: "Stara cesta",
    price: "8KM",
    carModel: "Ford Focus 1",
    registration: "B33-A-111",
    duration: "14:00-18:00",
  });

  return (
    <View style={styles.container}>
      <GrayHeader title="Bookings" />

      {/* Tabs at top */}
      <TabsSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content under tabs */}
      <View style={styles.content}>
        {activeTab === "Active" ? (
          activeParking ? (
            <ActiveParkingCard
              location={activeParking.location}
              price={activeParking.price}
              carModel={activeParking.carModel}
              registration={activeParking.registration}
              duration={activeParking.duration}
            />
          ) : (
            <Text style={styles.noParkingText}>No active parkings</Text>
          )
        ) : (
          <Text style={styles.noParkingText}>Expired bookings shown here</Text>
        )}
      </View>

      {/* Find parking button */}
      <View style={styles.buttonContainer}>
        <AddCarButton
          onPress={() => navigation.navigate("Near Me")}
          buttonText="Find new parking"
          style={{ backgroundColor: "#0195F5" }}
          textStyle={{ color: "white" }}
        />
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
    flex: 1,
    marginTop: 20, // ✅ small margin under tabs
    alignItems: "center", // ✅ center card horizontally
  },
  noParkingText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 20, // ✅ margin so it does not stick to tabs
  },
  buttonContainer: {
    position: "absolute",
    bottom: 140,
    width: "100%",
    alignItems: "center",
  },
});
