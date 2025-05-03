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
import { useParking } from "../../context/ParkingContext";
import HeartIcon from "../../components/svg/HeartIcon";
import CancelIcon from "../../components/svg/CancelIcon";
import NavigateIcon from "../../components/svg/Navigate";
import Compass from "../svg/Compass";
import Call from "../svg/Call";
import Walking from "../svg/Walking";
import { Linking } from "react-native";
import * as Location from "expo-location";
import CustomTimePicker from "../common/CustomTimePicker";
import dayjs from "dayjs";

const { height } = Dimensions.get("window");
export default function BottomSheetModal({ isVisible, onClose, location }) {
  const { cars } = useCar();
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [fromTime, setFromTime] = React.useState("");
  const [untilTime, setUntilTime] = React.useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardPicker, setShowCardPicker] = useState(false);
  const { setActiveParking } = useParking();
  const [walkingDuration, setWalkingDuration] = useState("...");
  const [isFromPickerVisible, setFromPickerVisible] = useState(false);
  const [isUntilPickerVisible, setUntilPickerVisible] = useState(false);
  const { toggleFavorite, isFavorited } = useParking();

  useEffect(() => {
    if (isVisible) {
      setStep(1);
    }
  }, [isVisible]);
  const formatTimeInput = (text) => {
    const digitsOnly = text.replace(/\D/g, "").slice(0, 4);
    if (digitsOnly.length <= 2) {
      return digitsOnly;
    }
    return `${digitsOnly.slice(0, 2)}:${digitsOnly.slice(2)}`;
  };

  const openNavigation = async () => {
    if (!location?.latitude || !location?.longitude) return;

    const lat = location.latitude;
    const lng = location.longitude;
    const label = encodeURIComponent(location.name || "Destination");

    const url =
      Platform.OS === "ios"
        ? `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`
        : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Maps app is not supported on this device.");
      }
    } catch (err) {
      if (!__DEV__) {
        Alert.alert("Error", "Failed to open maps.");
      } else {
        console.warn("Maps warning (non-blocking):", err.message);
      }
    }
  };

  useEffect(() => {
    const estimateWalkingTime = async () => {
      if (!isVisible || !location?.latitude || !location?.longitude) return;

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setWalkingDuration("N/A");
        return;
      }

      const currentLoc = await Location.getCurrentPositionAsync({});
      const dist = getDistanceInMeters(
        currentLoc.coords.latitude,
        currentLoc.coords.longitude,
        location.latitude,
        location.longitude
      );

      const duration = Math.round(dist / 83.33); // 5 km/h avg = 83.33 m/min
      setWalkingDuration(`${duration} min`);
    };

    estimateWalkingTime();
  }, [isVisible]);

  const getDistanceInMeters = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371000; // Earth radius in meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleConfirmFrom = (date) => {
    const formatted = dayjs(date).format("HH:mm");
    setFromTime(formatted);
    setFromPickerVisible(false);
  };

  const handleConfirmUntil = (date) => {
    const formatted = dayjs(date).format("HH:mm");
    setUntilTime(formatted);
    setUntilPickerVisible(false);
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
      useNativeDriver={false}
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
                  <TouchableOpacity
                    onPress={() => {
                      if (location && location.id) {
                        toggleFavorite(location);
                      }
                    }}
                    style={{ marginRight: 16 }} // ✅ shift heart icon left
                  >
                    <HeartIcon liked={isFavorited(location)} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={onClose}>
                    <CancelIcon size={27} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actions}>
                <ActionButton
                  icon={<NavigateIcon size={22} color="#fff" />}
                  label="Navigate"
                  onPress={openNavigation}
                />

                <ActionButton
                  icon={<Compass size={22} color="#fff" />}
                  label="Website"
                />
                <ActionButton
                  icon={<Call size={22} color="#fff" />}
                  label="Call"
                />
                <ActionButton
                  icon={<Walking size={22} color="#fff" />}
                  label={walkingDuration}
                />
              </View>

              {/* Time Selection */}
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ marginTop: 29 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
              >
                <View style={styles.timeRow}>
                  <TouchableOpacity
                    style={styles.timeInputButton}
                    onPress={() => setFromPickerVisible(true)}
                  >
                    <Text style={styles.timeInputText}>
                      {fromTime || "From"}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.arrow}>→</Text>

                  <TouchableOpacity
                    style={styles.timeInputButton}
                    onPress={() => setUntilPickerVisible(true)}
                  >
                    <Text style={styles.timeInputText}>
                      {untilTime || "Until"}
                    </Text>
                  </TouchableOpacity>
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
                  <CancelIcon size={25} color="#fff" />
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
                      <CancelIcon size={25} color="#fff" />
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
                    {!showCardPicker && (
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
                    )}
                  </View>

                  {/* Pay Now Button */}
                  <TouchableOpacity
                    style={[
                      styles.reserveButton,
                      {
                        backgroundColor:
                          acceptTerms && selectedCard ? "#0195F5" : "#8AD1FF",

                        marginTop: 30,
                      },
                    ]}
                    disabled={!(acceptTerms && selectedCard)}
                    onPress={() => {
                      setActiveParking({
                        location: location?.name || "Unknown location",
                        price: `${calculatedPrice}KM`,
                        carModel: selectedCar || "Unknown car",
                        registration:
                          selectedCar?.match(/\(([^)]+)\)/)?.[1] ||
                          "Unknown plate", // extract registration inside ( )
                        duration: `${fromTime}-${untilTime}`,
                      });
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
      <CustomTimePicker
  isVisible={isFromPickerVisible}
  onClose={() => setFromPickerVisible(false)}
  onConfirm={handleConfirmFrom}
  selectedTime={new Date()} // you can pass parsed time here if needed
  theme="light"
/>

<CustomTimePicker
  isVisible={isUntilPickerVisible}
  onClose={() => setUntilPickerVisible(false)}
  onConfirm={handleConfirmUntil}
  selectedTime={new Date()}
  theme="light"
/>
    </Modal>
  );
}

const ActionButton = ({ icon, image, label, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    {icon ? (
      icon
    ) : (
      <Image source={image} style={styles.iconImage} resizeMode="contain" />
    )}
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
    width: 25,
    height: 25,
    marginRight: 12,
    tintColor: "#fff", // example: red heart
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

  timeInputButton: {
    backgroundColor: "#9C9C9C",
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: "41.5%",
    justifyContent: "center",
    alignItems: "center",
  },

  timeInputText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
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
