
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SocialButton = ({ icon, text, onPress, imageSource }) => {
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress}>
      {imageSource ? (
        <Image source={imageSource} style={{ width: 17, height: 20 }} />
      ) : (
        <FontAwesome name={icon} size={20} color="black" />
      )}
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
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SocialButton;
