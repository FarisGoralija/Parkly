import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Keyboard, TouchableWithoutFeedback} from 'react-native';
import InputField from '../../components/common/InputField.js';
import BlueUniversalButton from '../../components/common/BlueUniversalButton.js';
import TitleText from '../../components/common/TitleText.js';
import { isValidEmail } from '../../utils/Validation.js'; 

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const isSubmitDisabled = email.trim() === ''; 

  const handleResetPassword = () => {
    if (isValidEmail(email)) {

      setErrorMessage('');
      setIsEmailValid(true); 

    } else {
      setErrorMessage('Please enter a valid email address.');
      setIsEmailValid(false); 
    }
  };


  const handleClearInput = () => {
    setEmail('');
    setErrorMessage('');
    setIsEmailValid(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
    
        <View style={styles.titleText}>
          <TitleText 
            title="Forgot password" 
            subtitle="Please enter your email to reset the password" 
          />
        </View>

        <View style={[!isEmailValid && styles.inputError]}>
          <InputField
            placeholder="Email"
            value={email}
            placeholderColor="white"
            onChangeText={(text) => {
              setEmail(text);
              if (text.trim() === '') {
                setErrorMessage('');
                setIsEmailValid(true); // Reset when email is empty
              }
            }}
          />
          {email.length > 0 && (
            <TouchableOpacity onPress={handleClearInput} style={styles.clearIconContainer}>
              <Image
                source={require('../../assets/icons/clear.png')} // Update this with your image path
                style={styles.clearIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Error message placed outside the input field */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>  // Display error message below input field
        ) : null}

        <View style={styles.resetPasswordButton}>
          <BlueUniversalButton 
            text="Reset password" 
            onPress={handleResetPassword}  // Trigger the reset password logic on press
            disabled={isSubmitDisabled}  // Disable button if email is empty
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content at the top
    paddingHorizontal: 20,
    paddingTop: 80, // Add space at the top for better alignment
    backgroundColor: 'white',
  },
  titleText: {
    marginBottom: 20, // Adjust this value to add space between title and input field
  },
  inputField: {
    height: 45,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#9C9C9C',

  },
  inputError: {
    borderColor: '#E92440',
    borderRadius: 11,
    borderWidth: 1, // Red border for invalid email
  },
  clearIconContainer: {
    position: 'absolute',
    right: 10,
    top: 22,
    transform: [{ translateY: -12 }],
  },
  clearIcon: {
    width: 31,
    height: 26,
  },
  errorText: {
    color: '#E92440',
    fontSize: 13,
    marginTop: 4,
  },
  resetPasswordButton: {
    width: '100%',
    marginTop: 20,
  }
});

export default ForgotPasswordScreen;
