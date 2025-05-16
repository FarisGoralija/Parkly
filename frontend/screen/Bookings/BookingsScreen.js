import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import TabsSwitcher from "../../components/Booking/TabsSwitcher";
import AddCarButton from "../../components/MyCar/AddCarButton";
import NearMeScreen from "../../screen/NearMeScreen";
import ActiveParkingCard from "../../components/Booking/ActiveParkingCard";
import { useParking } from "../../context/ParkingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import axios from "axios";
import endpoints from "../../api/endpoints";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import MiniSpinner from "../../components/Registration/MiniSpinner";


export default function BookingsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Active");
  const { activeParking } = useParking();
  const [activeReservations, setActiveReservations] = useState([]);
  const [expiredReservations, setExpiredReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const response = await axios.get(endpoints.getReservations, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sortByDateDesc = (arr) =>
        arr
          ?.slice()
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setActiveReservations(
        sortByDateDesc(response.data.active_reservations || [])
      );
      setExpiredReservations(
        sortByDateDesc(response.data.expired_reservations || [])
      );
    } catch (err) {
      console.error(
        "❌ Failed to fetch reservations:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchReservations();
    }, [])
  );

  return (
    <View style={styles.container}>
      <GrayHeader title="Bookings" />

      {/* Tabs at top */}
      <TabsSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content under tabs */}
      <View style={styles.content}>
        {activeTab === "Active" ? (
          activeReservations.length > 0 ? (
            <FlatList
              data={activeReservations} // or expiredReservations
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ActiveParkingCard
                  location={item.parking.name}
                  price={`${item.parking.price} KM`}
                  carModel={`${item.car.brand} ${item.car.model}`}
                  registration={item.car.license_plate}
                  duration={`${item.start_time.slice(
                    11,
                    16
                  )} - ${item.end_time.slice(11, 16)}`}
                />
              )}
              contentContainerStyle={{ paddingBottom: 50}} // 👈 prevents overlap
            />
          ) : (
            <Text style={styles.noParkingText}>No active reservations</Text>
          )
        ) : expiredReservations.length > 0 ? (
          <FlatList
            data={expiredReservations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ActiveParkingCard
                location={item.parking.name}
                price={`${item.parking.price} KM`}
                carModel={`${item.car.brand} ${item.car.model}`}
                registration={item.car.license_plate}
                duration={`${item.start_time.slice(
                  11,
                  16
                )} - ${item.end_time.slice(11, 16)}`}
              />
            )}
          />
        ) : (
          <Text style={styles.noParkingText}>No expired reservations</Text>
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
  marginTop: 20,
  overflow: "hidden", // 👈 hides overflow
  paddingBottom: 185, // 👈 matches button height
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
