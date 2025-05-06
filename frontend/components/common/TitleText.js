import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../svg/backButton"; 

const TitleText = ({
  title,
  subtitle,
  subtitleStyle,
  backIconStyle,
  titleStyle,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackButton color= "white" style={backIconStyle} /> 
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
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
    paddingTop: 20,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 14,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "white", 
  },
  subtitle: {
    fontSize: 15,
    color: "white", 
    textAlign: "center",
    fontWeight: "400",
    alignSelf: "center",
  },
});

export default TitleText;
