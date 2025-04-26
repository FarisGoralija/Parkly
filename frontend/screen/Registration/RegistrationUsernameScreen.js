import { View, StyleSheet } from "react-native";
import React from "react";
import TitleText from "../../components/common/TitleText";
import InputField from "../../components/common/InputField";
import BlueUniversalButton from "../../components/common/BlueUniversalButton";

const RegistrationUsernameScreen = () => {
  return (
    <View style={styles.container}>
      <TitleText
        title={"Create Username"}
        subtitle={
          "Choose a username for your new account. You can always change it later."
        }
      />

      <InputField placeholder={"Username"} />

      <BlueUniversalButton text={"Create Username"} />
    </View>
  );
};

export default RegistrationUsernameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "white",
  },
});
