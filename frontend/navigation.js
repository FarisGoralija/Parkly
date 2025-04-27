import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/common/BottomTabs"; // Use BottomTabs instead of CustomBottomTab
import LoginScreen from "./screen/LoginScreen";
import ForgotPasswordScreen from "./screen/ForgotPassword/ForgotPasswordScreen";
import ForgotVerifyCodeScreen from "./screen/ForgotPassword/ForgotVerifyCodeScreen";
import ForgotNewPasswordScreen from "./screen/ForgotPassword/ForgotNewPasswordScreen";
import CarDetailsScreen from "./screen/MyCar/CarDetailsScreen";
import { CarProvider } from "./context/CarContext";
import { ParkingProvider } from "./context/ParkingContext";



const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
       <ParkingProvider>
       <CarProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName="Home">
        <Stack.Screen name="Home" component={BottomTabs} /> 
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} /> 
        <Stack.Screen name="ForgotVerifyCodeScreen" component={ForgotVerifyCodeScreen} /> 
        <Stack.Screen name="ForgotNewPasswordScreen" component={ForgotNewPasswordScreen} /> 
        <Stack.Screen name="CarDetailsScreen" component={CarDetailsScreen} />
      </Stack.Navigator>
      </CarProvider>
      </ParkingProvider>
    </NavigationContainer>
  );
}