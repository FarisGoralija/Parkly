import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TabsSwitcher = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabsContainer}>
      {/* Active Tab */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab("Active")}
      >
        <Text style={[styles.tabText, activeTab === "Active" && styles.activeText]}>
          Active
        </Text>
        {activeTab === "Active" && <View style={styles.activeLine} />}
      </TouchableOpacity>

      {/* Expired Tab */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab("Expired")}
      >
        <Text style={[styles.tabText, activeTab === "Expired" && styles.activeText]}>
          Expired
        </Text>
        {activeTab === "Expired" && <View style={styles.activeLine} />}
      </TouchableOpacity>
    </View>
  );
};

export default TabsSwitcher;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#3A3A3C",
    marginTop: 20,
  },
  tab: {
    alignItems: "center",
    marginHorizontal: 80,
    paddingBottom: 8,
  },
  tabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
  activeLine: {
    height: 2,
    width: "100%",
    backgroundColor: "#0195F5",
    marginTop: 5,
    borderRadius: 10,
  },
});
