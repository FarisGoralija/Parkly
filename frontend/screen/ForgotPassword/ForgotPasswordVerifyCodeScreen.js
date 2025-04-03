import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from "@react-navigation/native"; // Import useRoute hook
import VerifyInput from "../../components/ForgotPassword/VerifyInput";
import TitleText from "../../components/common/TitleText";
import TimerFooter from "../../components/ForgotPassword/TimerFooter";
import BlueUniversalButton from "../../components/common/BlueUniversalButton";

const ForgotPasswordVerifyCodeScreen = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(""); // Error message state
  const [borderColor, setBorderColor] = useState("#9C9C9C"); // Default border color

  const route = useRoute();
  const email = route.params?.email || "your email"; // Fallback if email is not available

  const handleVerify = () => {
    if (parseInt(code, 10) >= 50000) {
      // Code is valid, proceed with verification
      console.log("Entered Code:", code);
      setError(""); // Reset error message
      setBorderColor("#9C9C9C"); // Reset border color
    } else {
      // Code is incorrect, show error message and change border color
      setError("Code is incorrect, please try again.");
      setBorderColor("#E92440"); // Change border to red
    }
  };

  const handleResend = () => {
    console.log("Resending code...");
    // You can add logic here for resending the code
  };

  const handleChangeCode = (input) => {
    setCode(input);

    // Reset error and border color if input is cleared
    if (input.trim() === "") {
      setError(""); // Clear the error message when input is empty
      setBorderColor("#ccc"); // Reset border color
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

          <TitleText
            title="Forgot password"
            subtitle={`We just sent a 5 digit code to\n${email}, enter it below`}
            //subtitleStyle={styles.centerText}
            backIconStyle={styles.backIcon}
          />


        <View style={styles.codeInput}>
          <VerifyInput
            onChange={handleChangeCode} // Use handleChangeCode to update the state
            borderColor={borderColor} // Pass border color as prop
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.verifyEmailButton}>
          <BlueUniversalButton
            text="Verify Email"
            onPress={handleVerify}
            disabled={code.trim() === ""} // Disable button if input is empty
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
    backgroundColor: "white",
  },

  backIcon: {
    bottom: 20,

  },

  codeInput: {
    marginTop: 20,
  },

  centerText: {
    textAlign: "center",
    alignSelf: "center",
  },

  errorText: {
    marginTop: 6,
    color: "#E92440",
    textAlign: "center",
    fontSize: 13,
  },

  verifyEmailButton: {
    width: "100%",
    marginTop: 36,
  },
});

export default ForgotPasswordVerifyCodeScreen;
