// src/components/LoginButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';

const BlueUniversalButton = ({ disabled, onPress, text }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0195F5',
    padding: 14,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    height: 46,

  },
  disabledButton: {
    backgroundColor: '#8AD1FF',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 600,
  },
});

export default BlueUniversalButton;
