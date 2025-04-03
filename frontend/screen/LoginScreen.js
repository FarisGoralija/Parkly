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
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import InputField from "../components/common/InputField";
import SocialButton from "../components/Login/SocialButton";
import BlueUniversalButton from "../components/common/BlueUniversalButton";
import MainLogo from "../components/Login/MainLogo";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const navigation = useNavigation();

  const loadFonts = async () => {
    await Font.loadAsync({
      "Montserrat Alternates": require("../assets/fonts/MontserratAlternates-Bold.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0195F5" />
      </View>
    );
  }

  const isLoginDisabled = !username || !password;

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
              onPress={() => {}}
              text="Log in"
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
              onPress={() => navigation.navigate(" ")}
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
    backgroundColor: "white",
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
    right: 40,
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
    flexDirection: "row", // Ensures elements stay in one line
    alignItems: "center", // Aligns text vertically
  },
});

export default LoginScreen;
