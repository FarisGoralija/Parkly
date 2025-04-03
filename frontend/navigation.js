import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/common/BottomTabs"; // Use BottomTabs instead of CustomBottomTab
import LoginScreen from "./screen/LoginScreen";
import ForgotPasswordScreen from "./screen/ForgotPassword/ForgotPasswordScreen";
import ForgotPasswordVerifyCodeScreen from "./screen/ForgotPassword/ForgotPasswordVerifyCodeScreen";


const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName="ForgotPasswordScreen">
        <Stack.Screen name="Home" component={BottomTabs} /> 
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} /> 
        <Stack.Screen name="ForgotPasswordVerifyCodeScreen" component={ForgotPasswordVerifyCodeScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}