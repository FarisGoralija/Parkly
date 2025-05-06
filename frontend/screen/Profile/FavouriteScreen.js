import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { useParking } from "../../context/ParkingContext";
import HeartIcon from "../../components/svg/HeartIcon";
import GrayHeader from "../../components/common/GrayHeader";
import FavouriteParkingCard from "../../components/MyProfile/FavouriteParkingCard";


export default function FavouriteParkingScreen() {
  const { favoriteParkings, toggleFavorite } = useParking(); // ✅ fixed the key name
  const [selectedParkingToRemove, setSelectedParkingToRemove] = useState(null);
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);

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
            onToggleLike={() => {
              setSelectedParkingToRemove(item);
              setIsRemoveModalVisible(true);
            }}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No favorite parkings yet.</Text>
        }
      />

<Modal
  isVisible={isRemoveModalVisible}
  backdropOpacity={0.4}
  onBackdropPress={() => setIsRemoveModalVisible(false)}
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
      Remove from favorites?
    </Text>
    <Text style={{ fontSize: 16, color: "#333", marginBottom: 20 }}>
      Are you sure you want to remove this parking from your favorites?
    </Text>

    <View style={{ flexDirection: "row", gap: 12 }}>
      <TouchableOpacity
        onPress={() => setIsRemoveModalVisible(false)}
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
        onPress={() => {
          toggleFavorite(selectedParkingToRemove);
          setIsRemoveModalVisible(false);
        }}
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
