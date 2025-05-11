import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import ProfileDetailRow from "../../components/MyProfile/ProfileDetailRow";
import User from "../../components/svg/User";
import MailIcon from "../../components/svg/MailIcon";
import UsernameIcon from "../../components/svg/UsernameIcon";
import LockIcon from "../../components/svg/LockIcon";
import { useNavigation } from "@react-navigation/native";
import { useRegistration } from "../../context/RegistrationContext";

export default function ProfileDetailsScreen() {
  const navigation = useNavigation();
  const {registrationData} = useRegistration();

  const {name, email, username, password} = registrationData;

  return (
    <View style={styles.container}>
      <GrayHeader title="Profile Details" />
      <View style={styles.content}>
        <ProfileDetailRow icon={<User />} label="Name & surname" value={name} />
        <ProfileDetailRow icon={<MailIcon />} label="Email address" value={email} />
        <ProfileDetailRow icon={<UsernameIcon />} label="Username" value={username} />
        <ProfileDetailRow icon={<LockIcon />} label="Password" value="•••••••••••" showEye />

        {/* 👇 Add clickable "Change password" text */}
        <TouchableOpacity >
          <Text style={styles.changePassword}>Change password</Text>
        </TouchableOpacity>
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
  changePassword: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "right",
    marginTop: -10,
    marginBottom: 20,
    marginRight: 4,
  },
});
