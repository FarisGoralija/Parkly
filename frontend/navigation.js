import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import NearMeScreen from "./screen/NearMeScreen";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NearMe">
      <Stack.Screen 
          name="NearMe" 
          component={NearMeScreen} 
          options={{ headerShown: false }} // Hides the header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
