import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SocialButton = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress}>
      {icon && <FontAwesome name={icon} size={20} color="black" />}
      <Text style={styles.socialText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'gray',
    padding: 12,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 15,
  },
  socialText: {
    fontSize: 16,
    fontWeight: 600,
  },
});

export default SocialButton;
