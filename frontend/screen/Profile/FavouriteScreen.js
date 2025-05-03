import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useParking } from "../../context/ParkingContext";
import HeartIcon from "../../components/svg/HeartIcon";
import GrayHeader from "../../components/common/GrayHeader";
import FavouriteParkingCard from "../../components/MyProfile/FavouriteParkingCard";

export default function FavouriteParkingScreen() {
  const { favoriteParkings, toggleFavorite } = useParking(); // ✅ fixed the key name

  return (
    <View style={styles.container}>
      <GrayHeader title="Favourite Parkings" />
      <FlatList
        data={favoriteParkings} // ✅ using correct context state
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <FavouriteParkingCard
            name={item.name}
            price="2 KM / per h"
            liked={true}
            onToggleLike={() => toggleFavorite(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No favorite parkings yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C",
  },
  list: {
    padding: 22,
  },
  item: {
    height: 60,
    paddingHorizontal: 22,
    backgroundColor: "#4A4A4A",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 4,
  },
  empty: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
