import React from 'react';
import { View, StyleSheet, Text} from 'react-native';


const MainLogo = () => {
  return (
  <View>
    <Text style={styles.logo}>
      park<Text style={styles.bold}>ly</Text>
    </Text>
  </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 50,
    fontFamily: 'Montserrat Alternates',
    fontWeight: 'bold',
    color: '#4F7AB4',
    lineHeight: 60, 
    marginBottom: 59,
  },
  bold: {
    color: 'gray',
    fontFamily: 'Montserrat Alternates',
  },

});

export default MainLogo;