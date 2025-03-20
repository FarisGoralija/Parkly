import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/common/BottomTabs"; // Use BottomTabs instead of CustomBottomTab

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={BottomTabs} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
