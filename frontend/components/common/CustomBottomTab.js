import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomBottomTab = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;

        let iconName;
        if (label === "Near Me") {
          iconName = "location-outline";
        } else if (label === "My Car") {
          iconName = "car-outline";
        } else if (label === "Bookings") {
          iconName = "document-text-outline";
        } else if (label === "Profile") {
          iconName = "person-outline";
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabButton}
          >
            <Ionicons
              name={iconName}
              size={26}
              color={isFocused ? "#0195F5" : "#ffffff"}
            />
            <Text style={[styles.text, isFocused && styles.textActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2E2F36",
    borderRadius: 24,
    padding: 10,
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    width: "90%",
    justifyContent: "space-around",
    elevation: 5,
    height:75,
    
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    marginTop:5,
  },
  text: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: 3,
  },
  textActive: {
    color: "#0195F5",
  },
});

export default CustomBottomTab;
