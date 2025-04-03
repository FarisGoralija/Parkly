import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TimerFooter = ({ onResend }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.timer}>Time remaining: {timeLeft}</Text>
      {timeLeft === 0 && (
        <TouchableOpacity onPress={onResend}>
          <Text style={styles.resend}>Resend code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  timer: {
    fontSize: 14,
    color: 'gray',
  },
  resend: {
    fontSize: 14,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default TimerFooter;
