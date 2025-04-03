import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TitleText = ({ title, subtitle, subtitleStyle, backIconStyle }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../../assets/icons/back.png')} style={[styles.backIcon, backIconStyle]} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    width: '100%', 
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute', 
    left: 2,
    bottom: 40,
  
  },
  backIcon: {
    width: 63,
    height: 42,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 700,
    marginBottom: 20,

  },
  subtitle: {
    fontSize: 15,
    color: '#9C9C9C',
  },
});

export default TitleText;
