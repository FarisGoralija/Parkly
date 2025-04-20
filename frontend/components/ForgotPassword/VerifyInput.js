import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const VerifyInput = ({ onChange, borderColor }) => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    onChange(newCode.join(''));

    if (text && index < 4) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.inputContainer}>
      {code.map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          style={[styles.input, { borderColor: borderColor }]}  // Apply dynamic border color
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    backgroundColor: "#9C9C9C",
    width: 63,
    height: 72,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 36,
    color: "white",
    borderRadius: 10,
    borderWidth: 1,
   // borderColor: 'black',

  },
});

export default VerifyInput;
