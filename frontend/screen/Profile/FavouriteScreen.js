import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { useParking } from "../../context/ParkingContext";
import GrayHeader from "../../components/common/GrayHeader";
import FavouriteParkingCard from "../../components/MyProfile/FavouriteParkingCard";
import MiniSpinner from "../../components/Registration/MiniSpinner";
 
export default function FavouriteParkingScreen() {
  const {
    favoriteParkings,
    toggleFavorite,
    loadFavorites,
  } = useParking();
 
  const [selectedParkingToRemove, setSelectedParkingToRemove] = useState(null);
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
 const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
  const fetchFavorites = async () => {
    setIsLoading(true);
    await loadFavorites();
    setIsLoading(false);
  };
 
  fetchFavorites();
}, []);
 
  return (
<View style={styles.container}>
<GrayHeader title="Favourite Parkings" />
{isLoading ? (
<View style={styles.spinnerContainer}>
<MiniSpinner size={40} color="#ffffff" />
<Text style={styles.loadingText}>Loading favorites...</Text>
</View>
) : (
<FlatList
    data={favoriteParkings}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={styles.list}
    renderItem={({ item }) => (
<FavouriteParkingCard
        name={item.name}
        price={`${parseFloat(item.price).toFixed(2)} KM / per h`}
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
)}
      <Modal
        isVisible={isRemoveModalVisible}
        backdropOpacity={0.4}
        onBackdropPress={() => setIsRemoveModalVisible(false)}
        useNativeDriver
>
<View style={styles.modalContent}>
<Text style={styles.modalTitle}>Remove from favorites?</Text>
<Text style={styles.modalText}>
            Are you sure you want to remove this parking from your favorites?
</Text>
 
          <View style={styles.modalButtons}>
<TouchableOpacity
              onPress={() => setIsRemoveModalVisible(false)}
              style={styles.cancelButton}
>
<Text style={styles.cancelText}>No</Text>
</TouchableOpacity>
 
            <TouchableOpacity
              onPress={() => {
                toggleFavorite(selectedParkingToRemove);
                setIsRemoveModalVisible(false);
              }}
              style={styles.confirmButton}
>
<Text style={styles.confirmText}>Yes</Text>
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
  empty: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    backgroundColor: "#E5E5EA",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  cancelText: {
    color: "#000",
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "#0195F5",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  }, 
  spinnerContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: -200, // match the other screen
},
loadingText: {
  marginTop: 10,
  fontSize: 16,
  color: "white",
  textAlign: "center",
},
});