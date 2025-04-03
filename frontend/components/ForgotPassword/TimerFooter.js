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

  const handleResend = () => {
    setTimeLeft(60); // Reset timer
    if (onResend) {
      onResend();
    }
  };

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.timer}>Time remaining: {timeLeft}</Text>
      {timeLeft === 0 && (
        <TouchableOpacity onPress={handleResend}>
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
    fontSize: 15,
    color: '#9C9C9C',
    fontWeight: '400',
  },
  resend: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
  },
});

export default TimerFooter;
