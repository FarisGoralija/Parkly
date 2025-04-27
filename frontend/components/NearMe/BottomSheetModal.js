import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import { calculatePrice } from "../../utils/priceCalculator";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../context/CarContext";

const { height } = Dimensions.get("window");
export default function BottomSheetModal({ isVisible, onClose, location }) {
  const { cars } = useCar();
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [fromTime, setFromTime] = React.useState("");
  const [untilTime, setUntilTime] = React.useState("");
  const [liked, setLiked] = React.useState(false);
  const [selectedCar, setSelectedCar] = useState(null); // ✅ Selected car
  const [showPicker, setShowPicker] = useState(false); // ✅ Show/hide car picker
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // for Step 3
  const [showCardPicker, setShowCardPicker] = useState(false); // NEW for Step 3

  useEffect(() => {
    if (isVisible) {
      setStep(1); // Reset to Step 1 every time modal opens
    }
  }, [isVisible]);
  const formatTimeInput = (text) => {
    const digitsOnly = text.replace(/\D/g, "").slice(0, 4); // Keep only 4 digits max
    if (digitsOnly.length <= 2) {
      return digitsOnly;
    }
    return `${digitsOnly.slice(0, 2)}:${digitsOnly.slice(2)}`;
  };
  const isValidTime = (time) => {
    const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/; // Matches HH:MM from 00:00 to 23:59
    return timeRegex.test(time);
  };

  const calculatedPrice =
    isValidTime(fromTime) && isValidTime(untilTime)
      ? calculatePrice(fromTime, untilTime)
      : 0;

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.3}
      onBackdropPress={onClose}
      propagateSwipe
      avoidKeyboard
      useNativeDriver={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.handle} />
          {step === 1 ? (
            <>
              {/* STEP 1: Reserve Screen */}
              <View style={styles.header}>
                <View>
                  <Text style={styles.title}>
                    {location?.name || "Location name"}
                  </Text>
                  <Text style={styles.subtitle}>2 KM / per h</Text>
                </View>
                <View style={styles.headerIcons}>
                  <TouchableOpacity onPress={() => setLiked(!liked)}>
                    <Image
                      source={require("../../assets/icons/Heart.png")}
                      style={[
                        styles.heartIcon,
                        { tintColor: liked ? "darkred" : "#fff" },
                      ]}
                    />
                  </TouchableOpacity>
                  <Image
                    source={require("../../assets/icons/ShareRounded.png")}
                    style={styles.shareIcon}
                  />
                  <TouchableOpacity onPress={onClose}>
                    <Image
                      source={require("../../assets/icons/Cancel.png")}
                      style={styles.cancelIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actions}>
                <ActionButton
                  image={require("../../assets/icons/Navigate.png")}
                  label="Navigate"
                />
                <ActionButton
                  image={require("../../assets/icons/Compass.png")}
                  label="Website"
                />
                <ActionButton
                  image={require("../../assets/icons/Phone.png")}
                  label="Call"
                />
                <ActionButton
                  image={require("../../assets/icons/Walking.png")}
                  label="4 min"
                />
              </View>

              {/* Time Selection */}
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ marginTop: 29 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
              >
                <View style={styles.timeRow}>
                  <TextInput
                    style={styles.timeInput}
                    value={fromTime}
                    onChangeText={(text) => setFromTime(formatTimeInput(text))}
                    keyboardType="numeric"
                    placeholder="From"
                    placeholderTextColor="#D2D2D2"
                  />
                  <Text style={styles.arrow}>→</Text>
                  <TextInput
                    style={styles.timeInput}
                    value={untilTime}
                    onChangeText={(text) => setUntilTime(formatTimeInput(text))}
                    keyboardType="numeric"
                    placeholder="Until"
                    placeholderTextColor="#D2D2D2"
                  />
                </View>
              </KeyboardAvoidingView>

              {/* Price */}
              <View style={styles.priceRow}>
                <Text style={styles.price}>Price: {calculatedPrice}KM</Text>
                <Text style={styles.available}>18/50</Text>
              </View>

              {/* Reserve Now Button */}
              <TouchableOpacity
                style={[
                  styles.reserveButton,
                  {
                    backgroundColor:
                      isValidTime(fromTime) && isValidTime(untilTime)
                        ? "#0195F5"
                        : "#8AD1FF",
                  },
                ]}
                disabled={!(isValidTime(fromTime) && isValidTime(untilTime))}
                onPress={() => setStep(2)}
              >
                <Text style={styles.reserveText}>Reserve now</Text>
              </TouchableOpacity>
            </>
          ) : step === 2 ? (
            <>
              {/* STEP 2: Payment Screen */}
              <View style={styles.header}>
                <Text style={[styles.title, { marginBottom: 5 }]}>
                  Payment method
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Image
                    source={require("../../assets/icons/Cancel.png")}
                    style={styles.cancelIcon2}
                  />
                </TouchableOpacity>
              </View>

              {/* Price */}
              <Text style={styles.price2}>Price: {calculatedPrice}KM</Text>

              <View style={{ flex: 1, marginTop: 20 }}>
                {/* Choose Car Button */}
                <TouchableOpacity
                  style={styles.chooseCarButton}
                  onPress={() => setShowPicker(!showPicker)}
                >
                  <Text style={{ color: "#fff", flex: 1 }}>
                    {selectedCar ? selectedCar : "Choose car"}
                  </Text>
                  <Image
                    source={require("../../assets/icons/DropdownArrow.png")}
                    style={{ width: 30, height: 30, tintColor: "#fff" }}
                  />
                </TouchableOpacity>

                {/* Dropdown if opened */}
                {showPicker && (
                  <View style={styles.pickerDropdown}>
                    {cars.length === 0 ? (
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          paddingVertical: 10,
                        }}
                      >
                        No cars added
                      </Text>
                    ) : (
                      cars.map((car, index) => (
                        <TouchableOpacity
                          key={index}
                          style={{ paddingVertical: 10, paddingHorizontal: 16 }}
                          onPress={() => {
                            setSelectedCar(
                              `${car.brand} ${car.model} (${car.registration})`
                            );
                            setShowPicker(false);
                          }}
                        >
                          <Text style={{ color: "#fff" }}>
                            {car.brand} {car.model} ({car.registration})
                          </Text>
                        </TouchableOpacity>
                      ))
                    )}
                  </View>
                )}

                {/* Add a Car Button */}
                <TouchableOpacity
                  style={{ marginTop: 8 }}
                  onPress={() => {
                    onClose();
                    navigation.navigate("My Car");
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "right",
                      marginHorizontal: 15,
                    }}
                  >
                    Add a car
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.reserveButton,
                  { backgroundColor: selectedCar ? "#0195F5" : "#8AD1FF" },
                ]}
                onPress={() => setStep(3)}
                disabled={!selectedCar}
              >
                <Text style={styles.reserveText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* STEP 3: Final Payment (accept terms) */}
              <>
  
                <>
                 
                  <View style={styles.header}>
                    <Text style={[styles.title, { marginBottom: 5 }]}>
                      Payment method
                    </Text>
                    <TouchableOpacity onPress={onClose}>
                      <Image
                        source={require("../../assets/icons/Cancel.png")}
                        style={styles.cancelIcon2}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Price */}
                  <Text style={styles.price2}>Price: {calculatedPrice}KM</Text>

                  <View style={{ flex: 1, marginTop: 20 }}>
                    {/* Choose Card Button */}
                    <TouchableOpacity
                      style={styles.chooseCarButton}
                      onPress={() => setShowCardPicker(!showCardPicker)}
                    >
                      <Text style={{ color: "#fff", flex: 1 }}>
                        {selectedCard ? selectedCard : "Choose card"}
                      </Text>
                      <Image
                        source={require("../../assets/icons/DropdownArrow.png")}
                        style={{ width: 30, height: 30, tintColor: "#fff" }}
                      />
                    </TouchableOpacity>

                    {/* Dropdown */}
                    {showCardPicker && (
                      <View style={styles.pickerDropdown}>
                        {/* Fake card options */}
                        <TouchableOpacity
                          style={{ paddingVertical: 10, paddingHorizontal: 16 }}
                          onPress={() => {
                            setSelectedCard("Visa •••• 1234");

                            setShowCardPicker(false);
                          }}
                        >
                          <Text style={{ color: "#fff" }}>Visa •••• 1234</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ paddingVertical: 10, paddingHorizontal: 16 }}
                          onPress={() => {
                            setSelectedCard("Mastercard •••• 5678");
                            setShowCardPicker(false);
                          }}
                        >
                          <Text style={{ color: "#fff" }}>
                            Mastercard •••• 5678
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {/* Add a card */}
                    <TouchableOpacity
                      style={{ marginTop: 8 }}
                      onPress={() => {
                        onClose();
                        navigation.navigate("AddCardScreen"); // You can create this screen later
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "right",
                          marginHorizontal: 15,
                        }}
                      >
                        Add a card
                      </Text>
                    </TouchableOpacity>

                    {/* Accept Terms */}
                    <TouchableOpacity
                      onPress={() => setAcceptTerms(!acceptTerms)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 20,
                        marginHorizontal: 10,
                      }}
                    >
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          borderWidth: 2,
                          borderColor: "#fff",
                          backgroundColor: acceptTerms
                            ? "#0195F5"
                            : "transparent",
                          marginRight: 10,
                        }}
                      />
                      <Text style={{ color: "#fff" }}>
                        I accept the terms and conditions
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Pay Now Button */}
                  <TouchableOpacity
                    style={[
                      styles.reserveButton,
                      {
                        backgroundColor: acceptTerms ? "#0195F5" : "#8AD1FF",
                        marginTop: 30,
                      },
                    ]}
                    disabled={!acceptTerms}
                    onPress={() => {
                      onClose();
                      setStep(1);
                      setAcceptTerms(false);
                      setSelectedCar(null);
                      setFromTime("");
                      setUntilTime("");
                    }}
                  >
                    <Text style={styles.reserveText}>Pay Now</Text>
                  </TouchableOpacity>
                </>
              </>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const ActionButton = ({ image, label }) => (
  <TouchableOpacity style={styles.actionButton}>
    <Image source={image} style={styles.iconImage} resizeMode="contain" />
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    height: Platform.OS === "ios" ? height / 2.3 : height / 2,
    backgroundColor: "#3D3E45",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: "#888",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  headerImage: {
    width: 25,
    height: 25,
    marginHorizontal: 4,
    tintColor: "#fff",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },

  heartIcon: {
    width: 27,
    height: 27,
    marginRight: 12,
    tintColor: "#fff", // example: red heart
  },

  shareIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
    tintColor: "#fff",
  },

  cancelIcon: {
    width: 25,
    height: 25,
    tintColor: "#fff",
  },
  cancelIcon2: {
    width: 25,
    height: 25,
    tintColor: "#fff",
    right: 15,
    top: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginHorizontal: 15,
  },
  subtitle: {
    color: "#fff",
    marginHorizontal: 15,
    marginTop: 10,
    fontWeight: "600",
    fontSize: 16,
  },

  iconImage: {
    width: 20,
    height: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "#2e6ddf",
    borderRadius: 12,
    padding: 8,
    width: "20%",
    height: 46,
    justifyContent: "center",
  },
  actionLabel: {
    fontSize: 10,
    color: "#fff",
    marginTop: 4,
    textAlign: "center",
    fontWeight: "700",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeInput: {
    backgroundColor: "#9C9C9C",
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: "41.5%",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  arrow: {
    color: "#fff",
    fontSize: 24,
    marginHorizontal: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 15,
  },
  price: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  price2: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 15,
  },
  available: {
    color: "#1CD159",
    fontSize: 16,
    fontWeight: "600",
  },

  reserveButton: {
    backgroundColor: "#8AD1FF",
    paddingVertical: 13,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 15, // ✅ Add this line
    height: 46,
    marginHorizontal: 10,
    alignItems: "center",
  },

  reserveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  chooseCarButton: {
    backgroundColor: "#9C9C9C",
    borderRadius: 10,
    height: 41,
    justifyContent: "center",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  pickerDropdown: {
    backgroundColor: "#9C9C9C",
    borderRadius: 10,
    marginTop: 8,
    marginHorizontal: 10,
    paddingVertical: 5,
    maxHeight: 150, // ✅ Important: limit height so it scrolls if many cars
  },
});
