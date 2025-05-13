import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const InputField = ({ value, onChangeText, placeholder, placeholderColor, secureTextEntry,  autoCapitalize = "none"}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, value && styles.inputActive]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor || '#A9A9A9'}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 45,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#9C9C9C',
    color: "white"
  },
  inputActive: {
    color: 'white',
  },
});

export default InputField;
