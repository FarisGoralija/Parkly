import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import InputField from "../components/common/InputField";
import SocialButton from "../components/Login/SocialButton";
import BlueUniversalButton from "../components/common/BlueUniversalButton";
import MainLogo from "../components/Login/MainLogo";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import endpoints from "../api/endpoints";
import MiniSpinner from "../components/Registration/MiniSpinner";

const LoginScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(true); // Controls screen loading on mount
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Controls login button state

  const navigation = useNavigation();

  useEffect(() => {
    const loadFontsAndCheckToken = async () => {
      await Font.loadAsync({
        "Montserrat Alternates": require("../assets/fonts/MontserratAlternates-Bold.ttf"),
      });
      setFontsLoaded(true);

      const token = await AsyncStorage.getItem("auth_token");
      if (token) {
        navigation.navigate("Home"); // If token exists, redirect to Home screen
      } else {
        setLoading(false); // If no token, stop initial loading
      }
    };

    loadFontsAndCheckToken();
  }, [navigation]);

  const handleLogin = async () => {
    if (!username || !password) return;

    setIsLoggingIn(true);

    try {
      const response = await fetch(endpoints.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        await AsyncStorage.setItem("auth_token", token);
        navigation.navigate("Home");
      } else {
        const errorData = await response.json();
        Alert.alert("Login Failed", errorData.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0195F5" />
      </View>
    );
  }

  const isLoginDisabled = !username || !password || isLoggingIn;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.content}>
          <MainLogo />
          <View style={styles.inputField}>
            <InputField
              placeholder="Username"
              value={username}
              placeholderColor="#D2D2D2"
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.passwordContainer}>
            <InputField
              placeholder="Password"
              value={password}
              placeholderColor="#D2D2D2"
              onChangeText={setPassword}
              secureTextEntry={secureText}
            />
            {password && (
              <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Ionicons
                  name={secureText ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="white"
                  style={styles.eyeIconContainer}
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <View style={styles.loginButton}>
            <BlueUniversalButton
              disabled={isLoginDisabled}
              onPress={handleLogin}
              text={isLoggingIn ? <MiniSpinner size={18} color="white" /> : "Log in"}
            />
          </View>

          <Text style={styles.orText}>OR LOGIN WITH</Text>

          <View style={styles.socialButtonContainer}>
            <Image
              source={require("../assets/icons/pngwing1.png")}
              style={styles.appleIcon}
            />
            <SocialButton text="Login with Apple" onPress={() => {}} />
          </View>

          <View style={styles.socialButtonContainer}>
            <Image
              source={require("../assets/icons/pngwing2.png")}
              style={styles.googleIcon}
            />
            <SocialButton text="Login with Google" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegistrationNameScreen")}
            >
              <Text style={styles.registerLink}> Register now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3A3A3C",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orText: {
    marginVertical: 25,
    color: "#9C9C9C",
    fontSize: 13,
    fontWeight: "400",
  },
  loginButton: {
    width: "100%",
    marginTop: 25,
  },
  registerText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#9C9C9C",
  },
  registerLink: {
    color: "#3797EF",
    fontSize: 15,
    fontWeight: "400",
  },
  forgotPasswordContainer: {
    marginTop: 2,
    width: "100%",
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "#3797EF",
    fontSize: 13,
    fontWeight: "500",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  eyeIconContainer: {
    zIndex: 1,
    width: 25,
    height: 25,
    position: "relative",
    right: 58,
    top: 2,
  },
  footerContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  inputField: {
    width: "100%",
    marginBottom: 18,
  },
  socialButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 4,
  },
  appleIcon: {
    width: 17.33,
    height: 21,
    position: "relative",
    left: 107,
    bottom: 8,
    zIndex: 1,
  },
  googleIcon: {
    width: 16.5,
    height: 19,
    position: "relative",
    left: 105,
    bottom: 7,
    zIndex: 1,
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default LoginScreen;
