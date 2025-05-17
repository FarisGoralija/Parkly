import React, { useState, useEffect } from "react";

import {

  View,

  StyleSheet,

  FlatList,

  Text,

} from "react-native";

import GrayHeader from "../../components/common/GrayHeader";

import AddCarButton from "../../components/MyCar/AddCarButton";

import { useCard } from "../../context/CardContext";

import CardItem from "../../components/MyProfile/CardItem";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import endpoints from "../../api/endpoints";

import MiniSpinner from "../../components/Registration/MiniSpinner";
 
export default function MyCardScreen({ navigation }) {

  const { cards, setCards } = useCard();

  const [loadingCards, setLoadingCards] = useState(true);
 
  useEffect(() => {

    const fetchCards = async () => {

      try {

        setLoadingCards(true);

        const token = await AsyncStorage.getItem("auth_token");

        const user = JSON.parse(await AsyncStorage.getItem("user"));
 
        const response = await axios.get(endpoints.getUserCards(user.id), {

          headers: {

            Authorization: `Bearer ${token}`,

            Accept: "application/json",

          },

        });
 
        if (response.data) {

          setCards(response.data);

        }

      } catch (error) {

        console.error("Error fetching cards:", error);

      } finally {

        setLoadingCards(false);

      }

    };
 
    fetchCards();

  }, []);
 
  const handleDeleteCard = async (cardId) => {

    try {

      const token = await AsyncStorage.getItem("auth_token");

      const user = JSON.parse(await AsyncStorage.getItem("user"));

      if (!token || !user?.id || !cardId) return;
 
      await axios.delete(endpoints.deleteUserCard(user.id, cardId), {

        headers: {

          Authorization: `Bearer ${token}`,

          Accept: "application/json",

        },

      });
 
      const updated = cards.filter((c) => c.id !== cardId);

      setCards(updated);

    } catch (err) {

      console.error("❌ Failed to delete card:", err.response?.data || err.message);

    }

  };
 
  const handleAddCard = () => {

    navigation.navigate("CardDetails");

  };
 
  return (
<View style={styles.container}>
<GrayHeader title="My cards" />
 
      {loadingCards ? (
<View style={styles.spinnerContainer}>
<MiniSpinner size={40} color="#ffffff" />
<Text style={styles.loadingText}>Loading cards...</Text>
</View>

      ) : cards.length === 0 ? (
<Text style={styles.emptyText}>No cards added. Tap below to add one.</Text>

      ) : (
<FlatList

          data={cards}

          keyExtractor={(item, index) => index.toString()}

          renderItem={({ item }) => (
<CardItem

              card={item}

              onDelete={() => handleDeleteCard(item.id)}

            />

          )}

          contentContainerStyle={{ paddingTop: 20 }}

        />

      )}
 
      <View style={styles.buttonContainer}>
<AddCarButton

          onPress={handleAddCard}

          buttonText="Add card"

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

  spinnerContainer: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    marginTop: -150,

  },

  loadingText: {

    color: "#fff",

    marginTop: 12,

    fontSize: 16,

  },

  buttonContainer: {

    position: "absolute",

    bottom: 80,

    width: "100%",

    alignItems: "center",

  },

  emptyText: {

    textAlign: "center",

    color: "#fff",

    marginTop: 50,

    fontSize: 16,

  },

});

 