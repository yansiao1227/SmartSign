import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface TypewriterTextProps {
  text: string;
  interval?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, interval = 100 }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [showCursor, setShowCursor] = useState<boolean>(true);

  useEffect(() => {
    let currentIndex = 0;

    const timer = setInterval(() => {
      setDisplayedText(prevText => {
        if (currentIndex === text.length) {
          clearInterval(timer);
          return text;
        } else {
          currentIndex++;
          return text.substring(0, currentIndex);
        }
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prevShowCursor => !prevShowCursor);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontSize:32}}>{displayedText}</Text>
      {showCursor ?<View style={styles.cursor} />:<View style={{width:2}}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cursor: {
    width: 2,
    height: '100%',
    backgroundColor: 'black',
  },
});

export default TypewriterText;
