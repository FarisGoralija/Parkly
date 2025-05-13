import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";


const MiniSpinner = ({ size = 22, color = "#B0B0B0" }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderWidth: 2,
          borderColor: color,
          borderBottomColor: "transparent",
          borderRadius: size / 2,
          transform: [{ rotate }],
        },
        styles.spinner,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  spinner: {
    boxSizing: "border-box",
  },
});

export default MiniSpinner;