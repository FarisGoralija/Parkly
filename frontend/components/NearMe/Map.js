import React, { useState, useEffect, useRef } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

// Custom Google Maps Style
const customMapStyle = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#686868" }],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [{ color: "#f2f2f2" }],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [{ saturation: -100 }, { lightness: 45 }],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [{ visibility: "simplified" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ lightness: "-22" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ saturation: "11" }, { lightness: "-51" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text",
    stylers: [{ saturation: "3" }, { lightness: "-56" }, { weight: "2.20" }],
  },
  //map
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ lightness: "-52" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [{ weight: "6.13" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ lightness: "-16" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [{ saturation: "-41" }, { lightness: "-41" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.stroke",
    stylers: [{ weight: "5.46" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [{ weight: "0.72" }, { lightness: "-16" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ lightness: "-37" }],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [{ color: "#b7e4f4" }, { visibility: "on" }],
  },
];

export default function CustomMap({ parkings = [], onSelectLocation }) {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  // Request location and update map
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Allow location access to use this feature."
        );
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      const initialRegion = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

      setLocation(initialRegion);

      // ✅ Animate to user location ONCE
      if (mapRef.current) {
        mapRef.current.animateToRegion(initialRegion, 1000);
      }
    })();
  }, []);



  return (
    <View style={styles.container}>
      <MapView
  ref={mapRef}
  style={styles.map}
  customMapStyle={customMapStyle}
  initialRegion={{
    latitude: 43.8563,
    longitude: 18.4131,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  }}
  showsUserLocation={true}
  followsUserLocation={false}
>
  {parkings.map((parking) => (
    <Marker
      key={parking.id}
      coordinate={{
        latitude: parking.latitude,
        longitude: parking.longitude,
      }}
      title={parking.name}
      description={`Cijena: ${parking.price_per_hour} KM/h\nSlobodno: ${parking.available_slots}/${parking.total_slots}`}
      pinColor="green"
      onPress={() => onSelectLocation(parking)}
    />
  ))}
</MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  navigationIcon: {
    width: 25, // Adjust size to match Google Maps
    height: 25,
    tintColor: "#007AFF", // Blue color for arrow (optional)
    transform: [{ rotate: "0deg" }], // Adjust rotation if needed
  },
});
