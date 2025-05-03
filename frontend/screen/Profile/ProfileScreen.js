import React from "react";
import { View, StyleSheet } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import ProfileOptionCard from "../../components/MyProfile/ProfileOptionCard";
import User from "../../components/svg/User"; // ✅ your base64-wrapped icon

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <GrayHeader title="Profile" />
      <View style={styles.content}>
        <ProfileOptionCard text="Profile details" icon={<User />} />
        {/* Other cards will follow... */}
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
