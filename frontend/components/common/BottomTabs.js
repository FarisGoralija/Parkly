import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NearMeScreen from "../../screen/NearMeScreen";
import MyCarScreen from "../../screen/MyCarScreen";
import BookingsScreen from "../../screen/BookingsScreen";
import ProfileScreen from "../../screen/ProfileScreen";
import CustomBottomTab from "./CustomBottomTab"; // Import your custom bottom tab component

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomTab {...props} />} // Use CustomBottomTab here
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Near Me" component={NearMeScreen} />
      <Tab.Screen name="My Car" component={MyCarScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
