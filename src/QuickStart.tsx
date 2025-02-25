// HomeScreen.tsx

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import TypewriterText from './components/Typerwriter';
import ImageFade from './components/ImageFade';

const QuickStart: React.FC<any> = ({navigation}) => {
  let [recording, setRecording] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  const handlePress = () => {
    setRecording(true);
  };
  const handlePressOver = () => {
    navigation.replace('Records');
    setRecording(false);
  };
  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        backgroundColor: '#fff',
      }}>
      {recording ? (
        <View style={{paddingTop: -20}}>
          <ImageFade
            // ref="ImageFade"
            duration={200}
            delay={1000}
            style={{
              width: 200,
              height: 252,
            }}
            startAnimation={startAnimation}>
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
              source={require('./assets/1.png')}
            />
          </ImageFade>
        </View>
      ) : (
        <View style={{paddingTop: 100}}>
          <Text style={{fontSize: 48, paddingBottom: 50, color: '#000'}}>
            你好,
          </Text>
          <Text style={{fontSize: 32, color: '#000'}}>
            点击下方按钮,{'\n'}开始识别手势动作。
          </Text>
        </View>
      )}

      {recording && (
        <View style={styles.textContainer}>
          <TypewriterText text="手势智通" interval={30} />
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.circleBorder}>
          {recording ? (
            <TouchableOpacity onPress={handlePressOver}>
              <View style={styles.square} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handlePress}>
              <View style={styles.circle} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    paddingTop: 0,
    height: 300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    color: '#000',
    position: 'absolute',
    bottom: 50,
    width: '100%',
    height: 300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    height: 165,
    backgroundColor: '#F7F7F7',
    flex: 1,
    justifyContent: 'center',
  },
  circle: {
    width: 68,
    height: 68,
    borderRadius: 50,
    backgroundColor: '#FF425C',
  },
  square: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#FF425C',
  },
  circleBorder: {
    width: 84,
    height: 84,
    borderRadius: 50, // 通过设置宽高和 borderRadius 来实现圆形
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#707070', // 灰色边框
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginLeft: 10, // Adjust as needed
  },
});

export default QuickStart;
