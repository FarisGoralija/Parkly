import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomMap from "../components/NearMe/Map";
import SearchBar from "../components/NearMe/SearchBar"; // Import SearchBar

export default function NearMeScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* Search Bar positioned absolutely */}
        <View style={styles.searchContainer}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>

        {/* Full-Screen Map */}
        <CustomMap />
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
    top: 50, // Adjust for better placement
    left: 20,
    right: 20,
    zIndex: 10, // Ensure it's above the map
  },
});
