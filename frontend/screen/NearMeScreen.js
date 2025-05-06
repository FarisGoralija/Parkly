import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import endpoints from "../api/endpoints";
import CustomMap from "../components/NearMe/Map";
import SearchBar from "../components/NearMe/SearchBar";
import BottomSheetModal from "../components/NearMe/BottomSheetModal";

export default function NearMeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { data: parkings = [], isLoading, isError } = useQuery({
    queryKey: ["parkings"],
    queryFn: async () => {
      const response = await axios.get(endpoints.parking);
      console.log("Fetched response:", response.data);

  
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        throw new Error("Unexpected response format");
      }
    },
  });

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
    setSearchQuery("");
  };

  if (isLoading) {
    return <Text style={{ padding: 20 }}>Učitavanje parkinga...</Text>;
  }

  if (isError) {
    return (
      <Text style={{ padding: 20, color: "red" }}>
        Greška pri dohvaćanju parkinga.
      </Text>
    );
  }

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
                    setSelectedLocation(parking);
                  }}
                >
                  <Text style={styles.dropdownText}>{parking.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <CustomMap parkings={parkings} onSelectLocation={handleMarkerPress} />

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
