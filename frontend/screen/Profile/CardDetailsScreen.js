import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import AddCarButton from "../../components/MyCar/AddCarButton";
import Visa from "../../components/svg/Visa";           
import ChipCard from "../../components/svg/ChipCard";
import CardBackground from "../../components/svg/CardBackground";

export default function CardDetails({ navigation }) {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleAddCard = () => {
    navigation.goBack();
  };

  const isFormValid = cardholderName && cardNumber && expiry && cvv;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <GrayHeader title="Add card" />

        {/* Card Preview */}
        <View style={styles.cardPreview}>
  <View style={StyleSheet.absoluteFill}>
    <CardBackground width="100%" height="100%" />
  </View>

  <ChipCard style={styles.chip} />
  <Text style={styles.cardNumberText}>
    {cardNumber || "•••• •••• •••• ••••"}
  </Text>
  <View style={styles.cardBottomRow}>
    <Text style={styles.label}>{cardholderName || "Cardholder Name"}</Text>
    <Text style={styles.label}>{expiry || "MM/YY"}</Text>
  </View>
  <Visa style={styles.visaLogo} />
</View>


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
            onChangeText={(text) => {
                const cleaned = text.replace(/\D/g, "").slice(0, 16); // only digits, max 12
                const spaced = cleaned.replace(/(.{4})/g, "$1 ").trim(); // format as xxxx xxxx xxxx
                setCardNumber(spaced);
              }}
              
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <TextInput
              placeholder="MM/YY"
              placeholderTextColor="#D0D0D0"
              style={[styles.input, styles.halfInput]}
              value={expiry}
              onChangeText={(text) => {
                const cleaned = text.replace(/\D/g, "").slice(0, 4); // max 4 digits
                const formatted = cleaned.length > 2
                  ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
                  : cleaned;
                setExpiry(formatted);
              }}
              
              keyboardType="numeric"
            />
            <TextInput
              placeholder="CVV"
              placeholderTextColor="#D0D0D0"
              style={[styles.input, styles.halfInput]}
              value={cvv}
              onChangeText={(text) => {
                const cleaned = text.replace(/\D/g, "").slice(0, 3);
                setCvv(cleaned);
              }}
              
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
  cardPreview: {
    backgroundColor: "#4F4F52",
    borderRadius: 16,
    padding: 20,
    marginTop: 30,
    marginHorizontal: 20,
    height: 170,
    justifyContent: "space-between",
  },
  chip: {
    width: 40,
    height: 30,
  },
  visaLogo: {
    alignSelf: "flex-end",
    width: 60,
    height: 25,
  },
  cardNumberText: {
    color: "#888888",
    fontSize: 20,
    letterSpacing: 2,
    marginTop: 10,
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },
  label: {
    color: "#888888",
    fontSize: 14,
    fontWeight: "500",
  },
  form: {
    marginTop: 30,
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
