import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import GrayHeader from "../../components/common/GrayHeader";
import TabsSwitcher from "../../components/Booking/TabsSwitcher"; // ✅ Import

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <View style={styles.container}>
      <GrayHeader title="Bookings" />

      {/* Tabs */}
      <TabsSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content depending on active tab */}
      <View style={styles.content}>
        <Text style={styles.text}>
          {activeTab === "Active" ? "Active bookings shown here" : "Expired bookings shown here"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A3A3C",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
