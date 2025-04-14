import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import TypewriterText from './components/Typerwriter';
import ImageFade from './components/ImageFade';

export default function Test() {
  return (
    <View
      style={{
        paddingTop: 50,
        backgroundColor: '#fff',
      }}>
      <View>
        <View
          style={{
            paddingTop: -20,
          }}>
          <ImageFade
            // ref="ImageFade"
            duration={200}
            delay={1000}
            style={{
              width: 200,
              height: 252,
            }}
            startAnimation={true}>
            <Image
              style={{
                width: 200,
                height: 252,
              }}
              source={require('./assets/5.png')}
            />

            <Image
              style={{
                width: 200,
                height: 252,
              }}
              source={require('./assets/5.png')}
            />
          </ImageFade>
        </View>
        <View style={styles.textContainer}>
          <TypewriterText
            text={
              'I feel a terrible pain in my mouth. Can you stop for a moment？ I want some relief.'
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
