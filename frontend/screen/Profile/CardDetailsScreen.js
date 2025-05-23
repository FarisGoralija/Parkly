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
  TouchableOpacity,
} from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import AddCarButton from "../../components/MyCar/AddCarButton";
import Visa from "../../components/svg/Visa";
import ChipCard from "../../components/svg/ChipCard";
import CardBackground from "../../components/svg/CardBackground";
import Cancel from "../../components/svg/Cancel";
import { useCard } from "../../context/CardContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import endpoints from "../../api/endpoints";
 
 
export default function CardDetails({ navigation }) {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const { addCard } = useCard();
 
  const handleAddCard = async () => {
  // Strip spaces from card number for validation
  const rawCardNumber = cardNumber.replace(/\s/g, "");

  // Validate card number: exactly 16 digits
  if (!/^\d{16}$/.test(rawCardNumber)) {
    alert("Card number must be exactly 16 digits.");
    return;
  }

  // Validate CVV: exactly 3 digits
  if (!/^\d{3}$/.test(cvv)) {
    alert("CVV must be exactly 3 digits.");
    return;
  }

  // Validate expiry: MM/YY and date between 05/25 and 12/30
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(expiry)) {
    alert("Expiration must be in MM/YY format.");
    return;
  }

  const [expMonthStr, expYearStr] = expiry.split("/");
  const expMonth = parseInt(expMonthStr, 10);
  const expYear = parseInt(`20${expYearStr}`, 10);
  const expiryDate = new Date(expYear, expMonth);
  const minDate = new Date(2025, 4);  // May 2025 (0-based index)
  const maxDate = new Date(2030, 11); // Dec 2030

  if (expiryDate < minDate || expiryDate > maxDate) {
    alert("Expiration must be between 05/25 and 12/30.");
    return;
  }

  try {
    const token = await AsyncStorage.getItem("auth_token");
    const user = JSON.parse(await AsyncStorage.getItem("user"));

    if (!token || !user?.id) {
      console.warn("Missing token or user");
      return;
    }

    const payload = {
      cardholder_name: cardholderName,
      card_number: rawCardNumber,
      expiration_date: expiry,
      cvv_code: cvv,
    };

    const res = await axios.post(endpoints.addUserCard(user.id), payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Optionally update local context for instant UI feedback
    if (res.data) {
      addCard(res.data);
    }

    navigation.goBack();
  } catch (err) {
    console.error("Failed to add card:", err.response?.data || err.message);
  }
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
            <Text style={styles.label}>
              {cardholderName || "Cardholder Name"}
            </Text>
            <Text style={styles.label}>{expiry || "MM/YY"}</Text>
          </View>
          <Visa style={styles.visaLogo} />
        </View>
 
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.form}
        >
          {/* Cardholder Name */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Cardholder’s name"
              placeholderTextColor="#D0D0D0"
              style={styles.input}
              value={cardholderName}
              onChangeText={setCardholderName}
            />
            {cardholderName.length > 0 && (
              <TouchableOpacity
                style={styles.clearIcon}
                onPress={() => setCardholderName("")}
              >
                <Cancel width={20} height={20} />
              </TouchableOpacity>
            )}
          </View>
 
          {/* Card Number */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Card number"
              placeholderTextColor="#D0D0D0"
              style={styles.input}
              value={cardNumber}
              onChangeText={(text) => {
                const cleaned = text.replace(/\D/g, "").slice(0, 16);
                const spaced = cleaned.replace(/(.{4})/g, "$1 ").trim();
                setCardNumber(spaced);
              }}
              keyboardType="numeric"
            />
            {cardNumber.length > 0 && (
              <TouchableOpacity
                style={styles.clearIcon}
                onPress={() => setCardNumber("")}
              >
                <Cancel width={20} height={20} />
              </TouchableOpacity>
            )}
          </View>
 
          {/* Expiry */}
          <View style={styles.row}>
            {/* Expiry */}
            <View style={[styles.inputWrapper, styles.halfInput]}>
              <TextInput
                placeholder="MM/YY"
                placeholderTextColor="#D0D0D0"
                style={styles.input}
                value={expiry}
                onChangeText={(text) => {
                  const cleaned = text.replace(/\D/g, "").slice(0, 4);
                  const formatted =
                    cleaned.length > 2
                      ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
                      : cleaned;
                  setExpiry(formatted);
                }}
                keyboardType="numeric"
              />
              {expiry.length > 0 && (
                <TouchableOpacity
                  style={styles.clearIcon}
                  onPress={() => setExpiry("")}
                >
                  <Cancel width={20} height={20} />
                </TouchableOpacity>
              )}
            </View>
 
            {/* CVV */}
            <View style={[styles.inputWrapper, styles.halfInput]}>
              <TextInput
                placeholder="CVV"
                placeholderTextColor="#D0D0D0"
                style={styles.input}
                value={cvv}
                onChangeText={(text) => {
                  const cleaned = text.replace(/\D/g, "").slice(0, 3);
                  setCvv(cleaned);
                }}
                secureTextEntry
                keyboardType="numeric"
              />
              {cvv.length > 0 && (
                <TouchableOpacity
                  style={styles.clearIcon}
                  onPress={() => setCvv("")}
                >
                  <Cancel width={20} height={20} />
                </TouchableOpacity>
              )}
            </View>
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
    backgroundColor: "#2E2F36",
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
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
    marginBottom: 16,
  },
 
  clearIcon: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -17 }],
    zIndex: 1,
  },
});