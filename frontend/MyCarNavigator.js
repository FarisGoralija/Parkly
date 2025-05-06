import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyCarScreen from "./screen/MyCar/MyCarScreen";
import CarDetailsScreen from "./screen/MyCar/CarDetailsScreen";

const Stack = createStackNavigator();

export default function MyCarNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyCarScreen" component={MyCarScreen} />
      <Stack.Screen name="CarDetailsScreen" component={CarDetailsScreen} />
    </Stack.Navigator>
  );
}
