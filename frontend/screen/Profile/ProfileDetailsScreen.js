import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import ProfileDetailRow from "../../components/MyProfile/ProfileDetailRow";
import User from "../../components/svg/User";
import MailIcon from "../../components/svg/MailIcon";
import UsernameIcon from "../../components/svg/UsernameIcon";
import LockIcon from "../../components/svg/LockIcon";
import { useNavigation } from "@react-navigation/native";
import { useRegistration } from "../../context/RegistrationContext";
import { isUsernameTaken } from "../../utils/Validation";

export default function ProfileDetailsScreen() {
  const navigation = useNavigation();
  const { registrationData, updateRegistrationData } = useRegistration();
  const [usernameError, setUsernameError] = useState("");
  const [isEditing, setIsEditing] = useState(null); // Track which field is being edited
  const { name, email, username, password } = registrationData;

  return (
    <View style={styles.container}>
      <GrayHeader title="Profile Details" />
      <View style={styles.content}>
        <ProfileDetailRow
          icon={<User />}
          label="Name & surname"
          value={name}
          editable
          isEditing={isEditing} // Pass editing state
          setIsEditing={setIsEditing} // Pass function to change editing state
          onChangeText={(val) => updateRegistrationData("name", val)}
        />

        <ProfileDetailRow
          icon={<MailIcon />}
          label="Email address"
          value={email}
        />

        <ProfileDetailRow
          icon={<UsernameIcon />}
          label="Username"
          value={username}
          editable
          error={usernameError}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onChangeText={(val) => {
            if (!isUsernameTaken(val)) {
              setUsernameError("");
              updateRegistrationData("username", val);
            } else {
              setUsernameError("Username unavailable");
            }
          }}
        />
        
        <ProfileDetailRow
          icon={<LockIcon />}
          label="Password"
          value="•••••••••••"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("ChangePasswordScreen")}
        >
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
