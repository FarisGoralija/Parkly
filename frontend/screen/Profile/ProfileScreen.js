import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GrayHeader from "../../components/common/GrayHeader";
import ProfileOptionCard from "../../components/MyProfile/ProfileOptionCard";
import BlueHeart from "../../components/svg/blueHeart";
import User from "../../components/svg/User";
import AboutUs from "../../components/svg/AboutUs";
import Card from "../../components/svg/Card";
import LogOut from "../../components/svg/LogOut";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleLogoutPress = () => {
    Alert.alert(
      "Log out",
      "Are you sure you would like to log out?",
      [
        {
          text: "Cancel",
          style: "destructive",
        },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("auth_token");
              navigation.reset({
                index: 0,
                routes: [{ name: "LoginScreen" }],
              });
              console.log("Logged out, token removed")
            } catch (error) {
              console.error("Error logging out:", error);
            }
          },
          style: "default",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <GrayHeader title="Profile" />
      <View style={styles.content}>
        <ProfileOptionCard
          text="Profile details"
          icon={<User />}
          onPress={() => navigation.navigate("ProfileDetailsScreen")}
        />
        <ProfileOptionCard
          text="My Cards"
          icon={<Card />}
          onPress={() => navigation.navigate("MyCardScreen")}
        />
        <ProfileOptionCard
          text="Favourite parkings"
          icon={<BlueHeart />}
          onPress={() => navigation.navigate("FavouriteScreen")}
        />
        <ProfileOptionCard
          text="About us"
          icon={<AboutUs />}
          onPress={() => navigation.navigate("AboutUsScreen")}
        />

        <ProfileOptionCard
          text="Log out"
          icon={<LogOut />}
          onPress={handleLogoutPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C",
  },
  content: {
    marginTop: 60,
    paddingHorizontal: 16,
  },
});
