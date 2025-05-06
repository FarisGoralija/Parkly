import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import VerifyInput from "../../components/ForgotPassword/VerifyInput";
import TitleText from "../../components/common/TitleText";
import TimerFooter from "../../components/ForgotPassword/TimerFooter";
import BlueUniversalButton from "../../components/common/BlueUniversalButton";

const ForgotPasswordVerifyCodeScreen = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [borderColor, setBorderColor] = useState("#9C9C9C");

  const route = useRoute();
  const navigation = useNavigation();
  const email = route.params?.email || "your email";

  const handleVerify = () => {
    if (parseInt(code, 10) >= 50000) {
      console.log("Entered Code:", code);
      setError("");
      setBorderColor("#00C851"); // Green border for success

      navigation.navigate("ForgotNewPasswordScreen", { email });
    } else {
      setError("Code is incorrect, please try again.");
      setBorderColor("#E92440"); // Red border for error
    }
  };

  const handleResend = () => {
    console.log("Resending code...");
  };

  const handleChangeCode = (input) => {
    setCode(input);

    if (input.trim() === "") {
      setError("");
      setBorderColor("#9C9C9C"); // Reset to default when cleared
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <TitleText
            title="Forgot password"
            subtitle={`We just sent a 5 digit code to\n${email}, enter it below`}
          />
        </View>

        <View style={styles.codeInput}>
          <VerifyInput onChange={handleChangeCode} borderColor={borderColor} />
        </View>

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>

        <View style={styles.verifyEmailButton}>
          <BlueUniversalButton
            text="Verify Email"
            onPress={handleVerify}
            disabled={code.trim() === ""}
          />
        </View>

        <TimerFooter onResend={handleResend} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "#46474D",
  },

  codeInput: {
    marginTop: 15,
  },

  errorContainer: {
    minHeight: 10, // Reserve space even if there's no error
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    marginTop: 10,
    color: "#E92440",
    textAlign: "center",
    fontSize: 13,
  },

  verifyEmailButton: {
    width: "100%",
    marginTop: 15,
  },
});

export default ForgotPasswordVerifyCodeScreen;
