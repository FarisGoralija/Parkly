import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/common/BottomTabs"; 
import LoginScreen from "./screen/LoginScreen";
import ForgotPasswordScreen from "./screen/ForgotPassword/ForgotPasswordScreen";
import ForgotVerifyCodeScreen from "./screen/ForgotPassword/ForgotVerifyCodeScreen";
import ForgotNewPasswordScreen from "./screen/ForgotPassword/ForgotNewPasswordScreen";
import CarDetailsScreen from "./screen/MyCar/CarDetailsScreen";
import { CarProvider } from "./context/CarContext";
import { ParkingProvider } from "./context/ParkingContext";
import ProfileScreen from "./screen/Profile/ProfileScreen";
import FavouriteScreen from "./screen/Profile/FavouriteScreen";
import AboutUsScreen from "./screen/Profile/AboutUsScreen";
import ProfileDetailsScreen from "./screen/Profile/ProfileDetailsScreen";
import MyCardScreen from "./screen/Profile/MyCardScreen";
import CardDetails from "./screen/Profile/CardDetailsScreen";
import { CardProvider } from "./context/CardContext";
import RegistrationPasswordScreen from "./screen/Registration/RegistrationPasswordScreen";
import RegistrationUsernameScreen from "./screen/Registration/RegistrationUsernameScreen";
import RegistrationEmailScreen from "./screen/Registration/RegistrationEmailScreen";
import RegistrationNameScreen from "./screen/Registration/RegistrationNameScreen";


const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
       <ParkingProvider>
       <CardProvider> 
       <CarProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen">
        <Stack.Screen name="Home" component={BottomTabs} /> 
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} /> 
        <Stack.Screen name="ForgotVerifyCodeScreen" component={ForgotVerifyCodeScreen} /> 
        <Stack.Screen name="ForgotNewPasswordScreen" component={ForgotNewPasswordScreen} /> 
        <Stack.Screen name="CarDetailsScreen" component={CarDetailsScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
        <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
        <Stack.Screen name="ProfileDetailsScreen" component={ProfileDetailsScreen} />
        <Stack.Screen name="MyCardScreen" component={MyCardScreen} />
        <Stack.Screen name="CardDetails" component={CardDetails} />
        <Stack.Screen name="RegistrationPasswordScreen" component={RegistrationPasswordScreen} />
        <Stack.Screen name="RegistrationUsernameScreen" component={RegistrationUsernameScreen} />
        <Stack.Screen name="RegistrationEmailScreen" component={RegistrationEmailScreen} />
        <Stack.Screen name="RegistrationNameScreen" component={RegistrationNameScreen} />

      </Stack.Navigator>
      </CarProvider>
      </CardProvider>
      </ParkingProvider>
    </NavigationContainer>
  );
}