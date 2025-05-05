import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useMemo } from "react";
import { TouchableOpacity, Text } from "react-native";
import CustomMap from "../components/NearMe/Map";
import SearchBar from "../components/NearMe/SearchBar";
import BottomSheetModal from "../components/NearMe/BottomSheetModal"; // 👈 import modal

export default function NearMeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [parkings, setParkings] = useState([]);

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return parkings.filter((p) =>
      p.name?.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [searchQuery, parkings]);

  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
  };

  const closeModal = () => {
    setSelectedLocation(null);
    setSearchQuery(""); // Optional: also clear input on close
  };

  useEffect(() => {
    setParkings([
      {
        id: 1,
        name: "SCC Parking",
        latitude: 43.8554,
        longitude: 18.4078,
        price_per_hour: 2.0,
        total_slots: 50,
        available_slots: 18,
      },
      {
        id: 2,
        name: "BBI Parking",
        latitude: 43.8587,
        longitude: 18.4186,
        price_per_hour: 2.5,
        total_slots: 60,
        available_slots: 23,
      },
      {
        id: 3,
        name: "Stara Cesta",
        latitude: 43.8599,
        longitude: 18.425,
        price_per_hour: 1.0,
        total_slots: 40,
        available_slots: 9,
      },
    ]);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

          {searchQuery.length > 0 && filteredResults.length > 0 && (
            <View style={styles.dropdown}>
              {filteredResults.map((parking) => (
                <TouchableOpacity
                  key={parking.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSearchQuery("");
                    setSelectedLocation(parking); // ✅ This triggers the bottom sheet
                  }}
                >
                  <Text style={styles.dropdownText}>{parking.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <CustomMap
          parkings={parkings} // ✅ always show full list on map
          onSelectLocation={handleMarkerPress}
        />

        <BottomSheetModal
          isVisible={!!selectedLocation}
          onClose={closeModal}
          location={selectedLocation}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  dropdown: {
    position: "absolute",
    top: 58,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 5,
    marginTop: 8,
    elevation: 6,
    zIndex: 20,
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
});
