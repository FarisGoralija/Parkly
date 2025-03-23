import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomMap from "../components/NearMe/Map";
import SearchBar from "../components/NearMe/SearchBar";
import BottomSheetModal from "../components/NearMe/BottomSheetModal"; // 👈 import modal

export default function NearMeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
  };

  const closeModal = () => {
    setSelectedLocation(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>

        <CustomMap onSelectLocation={handleMarkerPress} />

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
});
