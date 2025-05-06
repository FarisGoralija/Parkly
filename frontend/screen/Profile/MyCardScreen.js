import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import AddCarButton from "../../components/MyCar/AddCarButton";
import { useCard } from "../../context/CardContext";
import CardItem from "../../components/MyProfile/CardItem"; // ✅ Import the new component

export default function MyCardScreen({ navigation }) {
  const { cards, setCards } = useCard();
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);

  const handleDeleteCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  const handleAddCard = () => {
    navigation.navigate("CardDetails");
  };

  return (
    <View style={styles.container}>
      <GrayHeader title="My cards" />

      {cards.length === 0 ? (
        <Text style={styles.emptyText}>No cards added. Tap below to add one.</Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <CardItem
              card={item}
              onDelete={() => handleDeleteCard(index)}
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
