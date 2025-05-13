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
import endpoints from "../../api/endpoints";
import axios from "axios";
import MiniSpinner from "../../components/Registration/MiniSpinner";

const ForgotPasswordVerifyCodeScreen = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [borderColor, setBorderColor] = useState("#9C9C9C");
  const [isSubmitting, setIsSubmitting] = useState(false); // Spinner for Verify button
  const [isResending, setIsResending] = useState(false); // Spinner for Resend button

  const route = useRoute();
  const navigation = useNavigation();
  const email = route.params?.email || "your email";

  // Function to handle the verification of the code
  const handleVerify = async () => {
    if (!code.trim()) {
      setError("Code is required"); // Error message for empty code
      setBorderColor("#E92440"); // Change border to red when there's an error
      return;
    }

    setIsSubmitting(true); // Show the spinner for verification

    try {
      const response = await axios.post(endpoints.verifyCode, {
        email,
        code,
      });

      if (response.status === 200) {
        setError(""); // Clear error message if verification is successful
        setBorderColor("#00C851"); // Set border color to green
        navigation.navigate("ForgotNewPasswordScreen", { email, code });
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Invalid code, please try again."
      );
      setBorderColor("#E92440"); // Show red border if verification fails
    } finally {
      setIsSubmitting(false); // Hide the spinner after verification is done
    }
  };

  // Function to handle resending the verification code
  const handleResend = async () => {
    setIsResending(true); // Show the spinner during resend process

    try {
      console.log("Resending verification code to:", email);

      // Request to resend the code to the email
      const response = await axios.post(endpoints.forgotPassword, {
        email,
      });

      if (response.status === 200) {
        setError(""); // Clear any previous errors
        console.log("Verification code resent successfully");

        // Optionally, you can show a success message here for the user
        // e.g., setError("A new code has been sent to your email.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to resend the code. Please try again."
      );
    } finally {
      setIsResending(false); // Hide the spinner after resend is complete
    }
  };

  // Handle the change in code input
  const handleChangeCode = (input) => {
    setCode(input);

    if (input.trim() === "") {
      setError(""); // Clear error message when input is cleared
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
            text={
              isSubmitting ? (
                <MiniSpinner size={18} color="white" />
              ) : (
                "Verify Email"
              )
            }
            onPress={handleVerify}
            disabled={code.trim() === "" || isSubmitting} // Disable button if no code or submitting
          />
        </View>

        <TimerFooter
          onResend={handleResend} // Call handleResend on click
          isResending={isResending} // Show spinner when resending
        />
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
    backgroundColor: "#3A3A3C",
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
