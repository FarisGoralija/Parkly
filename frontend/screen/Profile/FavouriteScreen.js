import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FavouriteParkingCard from "../../components/MyProfile/FavouriteParkingCard";
import GrayHeader from "../../components/common/GrayHeader";

export default function FavouriteScreen() {
  const [liked, setLiked] = useState(true);

  return (
    <View style={styles.container}>
      <GrayHeader title="Favourites" />
      <View style={styles.content}>
        <FavouriteParkingCard
          name="Parking Centar"
          price="2 KM / h"
          liked={liked}
          onToggleLike={() => setLiked(!liked)}
        />
        {/* You can render more cards here dynamically from a list */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C", // same as other screens
  },
  content: {
    marginTop: 60,
    paddingHorizontal: 16,
  },
});
