import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import ProfileOptionCard from "../../components/MyProfile/ProfileOptionCard";
import BlueHeart from "../../components/svg/blueHeart";
import User from "../../components/svg/User";
import AboutUs from "../../components/svg/AboutUs";
import Card from "../../components/svg/Card";
import LogOut from "../../components/svg/LogOut";

export default function ProfileScreen() {
  const handleLogoutPress = () => {
    Alert.alert(
      "Log out",
      "Are you sure you would like to log out?",
      [
        {
          text: "Cancel",
          style: "destructive", // iOS red
        },
        {
          text: "Confirm",
          onPress: () => {
            // Your logout logic here
            console.log("Logged out");
          },
          style: "default", // iOS blue
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <GrayHeader title="Profile" />
      <View style={styles.content}>
        <ProfileOptionCard text="Profile details" icon={<User />} />
        <ProfileOptionCard text="Payment methods" icon={<Card />} />
        <ProfileOptionCard text="Favourite parkings" icon={<BlueHeart />} />
        <ProfileOptionCard text="About us" icon={<AboutUs />} />
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
