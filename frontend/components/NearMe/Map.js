import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";

// Custom Google Maps Style
const customMapStyle = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#686868' }],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{ color: '#f2f2f2' }],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [{ saturation: -100 }, { lightness: 45 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [{ visibility: 'simplified' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ lightness: '-22' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ saturation: '11' }, { lightness: '-51' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [{ saturation: '3' }, { lightness: '-56' }, { weight: '2.20' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ lightness: '-52' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [{ weight: '6.13' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ lightness: '-16' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{ saturation: '-41' }, { lightness: '-41' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.stroke',
    stylers: [{ weight: '5.46' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [{ weight: '0.72' }, { lightness: '-16' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ lightness: '-37' }],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ color: '#b7e4f4' }, { visibility: 'on' }],
  },
];

export default function CustomMap() {
  const [location, setLocation] = useState(null);

  // Request location and update map
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to use this feature.");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    })();
  }, []);

  const locations = [
    { id: 1, name: "SCC", latitude: 43.8554, longitude: 18.4078 },
    { id: 2, name: "BBI", latitude: 43.8587, longitude: 18.4186 },
    { id: 3, name: "Random Location 1", latitude: 43.8599, longitude: 18.4250 },
    { id: 4, name: "Random Location 2", latitude: 43.8530, longitude: 18.4115 },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={customMapStyle}
        initialRegion={{
          latitude: 43.8563,
          longitude: 18.4131,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        region={location} // Updates the map to center on the user
        showsUserLocation={true} // Shows the blue dot
        followsUserLocation={true} // Moves the map with the user
      >
        {/* Show existing markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            pinColor="green"
          />
        ))}

        {/* Show User's Location Marker */}
        {location && (
          <Marker
            coordinate={location}
            title="You are here"
            pinColor="blue"
          />
        )}
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
});