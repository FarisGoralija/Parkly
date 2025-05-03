import React from "react";
import { View, StyleSheet } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import ProfileDetailRow from "../../components/MyProfile/ProfileDetailRow";
import User from "../../components/svg/User";
import MailIcon from "../../components/svg/MailIcon";
import UsernameIcon from "../../components/svg/Username";
import LockIcon from "../../components/svg/Lock";

export default function ProfileDetailsScreen() {
  return (
    <View style={styles.container}>
      <GrayHeader title="Profile Details" />
      <View style={styles.content}>
        <ProfileDetailRow icon={<User />} label="Name & surname" value="Erol Karisik" />
        <ProfileDetailRow icon={<MailIcon />} label="Email address" value="erol.erca@gmail.com" />
        <ProfileDetailRow icon={<UsernameIcon />} label="Username" value="erol_1946" />
        <ProfileDetailRow icon={<LockIcon />} label="Password" value="•••••••••••" showEye />
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
