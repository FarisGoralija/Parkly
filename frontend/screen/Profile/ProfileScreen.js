import React from "react";
import { View, StyleSheet } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import ProfileOptionCard from "../../components/MyProfile/ProfileOptionCard";
import BlueHeart from "../../components/svg/blueHeart";
import User from "../../components/svg/User";
import AboutUs from "../../components/svg/AboutUs";
import Card from "../../components/svg/Card";
import LogOut from "../../components/svg/LogOut";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <GrayHeader title="Profile" />
      <View style={styles.content}>
        <ProfileOptionCard text="Profile details" icon={<User />} />
        <ProfileOptionCard text="Payment methods" icon={<Card />} />
        <ProfileOptionCard text="Favourite parkings" icon={<BlueHeart/>} />
        <ProfileOptionCard text="About us" icon={<AboutUs/>} />
        <ProfileOptionCard text="Log out" icon={<LogOut />} />

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
