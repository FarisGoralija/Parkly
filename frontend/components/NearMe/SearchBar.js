import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ placeholder, value, onChangeText }) => {


  return (
    <View style={styles.shadowContainer}> 
      <View style={styles.container}>
    
        <TextInput
          style={styles.input}
          placeholder={placeholder && typeof placeholder === "string" ? placeholder : "Search..."}
          placeholderTextColor="#888"
          value={value && typeof value === "string" ? value : ""}
          onChangeText={onChangeText}
        />
        
     
        <Ionicons name="search" size={20} color="#727272" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)", 
    borderRadius: 30,
    padding: 9,
    alignSelf: "center",
    width: "90%",
    height:64,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    height:46,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: 40, 
    lineHeight: 20, 
    textAlignVertical: "center", 
    paddingVertical: 5, 
    includeFontPadding: false, 
  },
  
  icon: {
    marginLeft: 10,
  },
});

export default SearchBar;
