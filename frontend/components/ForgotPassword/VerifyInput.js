import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const VerifyInput = ({ onChange }) => {
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

  return (
    <View style={styles.inputContainer}>
      {code.map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          style={styles.input}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={(text) => handleChange(text, index)}
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
    marginVertical: 20,
    gap: 10,

  
  },
  input: {
    backgroundColor: "#9C9C9C",
    width: 63,
    height: 72,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
  },
});

export default VerifyInput;
