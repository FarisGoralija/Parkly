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
          onPress: () => {
            console.log("Logged out");
            // Add your logout logic here
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
        <ProfileOptionCard text="Profile details" icon={<User />} onPress={() => navigation.navigate("ProfileDetailsScreen")} />
        <ProfileOptionCard text="Payment methods" icon={<Card />} />
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
