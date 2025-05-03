import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NearMeScreen from "../../screen/NearMeScreen";
import MyCarScreen from "../../screen/MyCar/MyCarScreen";
import BookingsScreen from "../../screen/Bookings/BookingsScreen";
import ProfileScreen from "../../screen/Profile/ProfileScreen";
import CustomBottomTab from "./CustomBottomTab"; // Import your custom bottom tab component
import MyCarNavigator from "../../MyCarNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomTab {...props} />} // Use CustomBottomTab here
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Near Me" component={NearMeScreen} />

      <Tab.Screen name="My Car" component={MyCarNavigator} />

      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      
    </Tab.Navigator>
  );
}
