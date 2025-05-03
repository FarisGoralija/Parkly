import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import AddCarButton from "../../components/MyCar/AddCarButton";

export default function CardDetails({ navigation }) {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleAddCard = () => {
    // Add your card saving logic here
    navigation.goBack();
  };

  const isFormValid = cardholderName && cardNumber && expiry && cvv;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <GrayHeader title="Add card" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.form}
        >
          <TextInput
            placeholder="Cardholder’s name"
            placeholderTextColor="#D0D0D0"
            style={styles.input}
            value={cardholderName}
            onChangeText={setCardholderName}
          />
          <TextInput
            placeholder="Card number"
            placeholderTextColor="#D0D0D0"
            style={styles.input}
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <TextInput
              placeholder="MM/YY"
              placeholderTextColor="#D0D0D0"
              style={[styles.input, styles.halfInput]}
              value={expiry}
              onChangeText={setExpiry}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="CVV"
              placeholderTextColor="#D0D0D0"
              style={[styles.input, styles.halfInput]}
              value={cvv}
              onChangeText={setCvv}
              secureTextEntry
              keyboardType="numeric"
            />
          </View>
        </KeyboardAvoidingView>

        <View style={styles.buttonContainer}>
          <AddCarButton
            buttonText="Add card"
            onPress={handleAddCard}
            disabled={!isFormValid}
            style={{
              backgroundColor: isFormValid ? "#0195F5" : "#8AD1FF",
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C",
  },
  form: {
    marginTop: 80,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#9C9C9C",
    color: "#fff",
    fontSize: 16,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
});
