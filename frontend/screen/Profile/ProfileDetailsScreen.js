import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GrayHeader from "../../components/common/GrayHeader";
import ProfileDetailRow from "../../components/MyProfile/ProfileDetailRow";
import EditFieldModal from "../../components/MyProfile/EditFieldModal";
import User from "../../components/svg/User";
import MailIcon from "../../components/svg/MailIcon";
import UsernameIcon from "../../components/svg/UsernameIcon";
import LockIcon from "../../components/svg/LockIcon";
import { isUsernameTaken } from "../../utils/Validation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import endpoints from "../../api/endpoints";
import { useQueryClient } from "@tanstack/react-query";


export default function ProfileDetailsScreen() {
  const navigation = useNavigation();

const { data: userData, isLoading, isError } = useQuery({
  queryKey: ["userProfile"],
  queryFn: async () => {
    const token = await AsyncStorage.getItem("auth_token");
    const res = await axios.get(endpoints.getLoggedInUser, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user;
  },
});

  const name = userData?.name || "";
const email = userData?.email || "";
const username = userData?.username || "";


  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const queryClient = useQueryClient();

  // Open modal with field name and value
  const openEditModal = (field, value) => {
    setCurrentField(field);
    setCurrentValue(value);
    setUsernameError("");
    setModalVisible(true);
  };

  const handleSave = async () => {
  try {
    if (currentField === "Username" && isUsernameTaken(currentValue)) {
      setUsernameError("Username unavailable");
      return;
    }

    const fieldKeyMap = {
      "Name & surname": "name",
      "Username": "username",
    };

    const key = fieldKeyMap[currentField];
    if (!key) return;

    const token = await AsyncStorage.getItem("auth_token");

    const payload = { [key]: currentValue };

    await axios.patch(endpoints.updateProfile, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // ✅ Refresh user data after updating
    await queryClient.invalidateQueries(["userProfile"]);

    // ✅ Close modal
    setModalVisible(false);
  } catch (error) {
    console.error("Failed to update profile:", error.response?.data || error.message);
    if (error.response?.status === 422) {
      const errors = error.response.data.errors;
      if (errors?.username) setUsernameError(errors.username[0]);
    }
  }
};
  return (
    <View style={styles.container}>
      <GrayHeader title="Profile Details" />
      <View style={styles.content}>
        <ProfileDetailRow
          icon={<User />}
          label="Name & surname"
          value={name}
          editable
          onPressEdit={() => openEditModal("Name & surname", name)}
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
          onPressEdit={() => openEditModal("Username", username)}
        />

        <ProfileDetailRow
          icon={<LockIcon />}
          label="Password"
          value="•••••••••••"
        />

        <TouchableOpacity onPress={() => navigation.navigate("ChangePasswordScreen")}>
          <Text style={styles.changePassword}>Change password</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <EditFieldModal
        visible={modalVisible}
        fieldLabel={currentField}
        value={currentValue}
        onChangeText={setCurrentValue}
        onSave={handleSave}
        onClose={() => setModalVisible(false)}
        error={usernameError}
      />
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
