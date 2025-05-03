import React from "react";
import { View, StyleSheet } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import AddCarButton from "../../components/MyCar/AddCarButton";

export default function MyCardScreen({ navigation }) {
  const handleAddCard = () => {
    navigation.navigate("CardDetails");
  };

  return (
    <View style={styles.container}>
      <GrayHeader title="My cards" />

    
      <View style={styles.buttonContainer}>
        <AddCarButton
          onPress={handleAddCard}
          buttonText="Add card"
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
});
