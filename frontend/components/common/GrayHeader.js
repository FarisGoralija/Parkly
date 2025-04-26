import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../svg/backButton"; 

const GrayHeader = ({ title, titleStyle, backIconStyle }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
     <TouchableOpacity
  onPress={() => navigation.goBack()}
  style={styles.backButton}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
>
  <BackButton color="white" />
</TouchableOpacity>

      <View style={styles.titleWrapper}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
    </View>
  );
};

export default GrayHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3A3A3C",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 77,
    paddingBottom: 12,
    paddingHorizontal: 0, 
  },
  backButton: {
    marginLeft: 30, 
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center", 
    marginRight: 48,      
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
