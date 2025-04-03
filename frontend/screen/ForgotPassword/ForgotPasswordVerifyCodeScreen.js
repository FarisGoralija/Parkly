import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import VerifyInput from "../../components/ForgotPassword/VerifyInput";
import TitleText from "../../components/common/TitleText";
import TimerFooter from "../../components/ForgotPassword/TimerFooter";
import BlueUniversalButton from "../../components/common/BlueUniversalButton";

const ForgotPasswordVerifyCodeScreen = () => {
  const [code, setCode] = useState("");

  const handleVerify = () => {
    console.log("Entered Code:", code);
  };

  const handleResend = () => {
    console.log("Resending code...");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleText}>
        <TitleText
          title="Forgot password"
          subtitle="We just sent 5 digit code to"
        />
      </View>

      <VerifyInput onChange={setCode} />

      <View style={styles.verifyEmailButton}>
        <BlueUniversalButton
          text="Reset password"
          //onPress={handleResetPassword}
          //disabled={isSubmitDisabled}
        />
      </View>

      <TimerFooter onResend={handleResend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "white",
  },

  titleText: {
    marginBottom: 20,
  },

  verifyEmailButton: {
    width: '100%',
    marginTop: 20,
  },
});

export default ForgotPasswordVerifyCodeScreen;
