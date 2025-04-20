import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TitleText = ({ title, subtitle, subtitleStyle, backIconStyle }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image
          source={require("../../assets/icons/back.png")}
          style={[styles.backIcon, backIconStyle]}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    paddingTop: 20, // Ensure spacing consistency
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 5, // Adjust for proper alignment
    // padding: 10, // Give more tap area
  },
  backIcon: {
    width: 63,
    height: 42, // Adjusted for better scaling
  },
  textContainer: {
    flex: 1, // Takes available space
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#9C9C9C",
    textAlign: "center",
    fontWeight: "400",
    textAlign: 'center',
    alignSelf: 'center',
    
  },
});

export default TitleText;
