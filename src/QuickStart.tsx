// HomeScreen.tsx

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
import {useData} from './model/DataContext';
import axios from 'axios';
import Tts from 'react-native-tts';

import {useIsFocused, CommonActions} from '@react-navigation/native';

const QuickStart: React.FC<any> = ({navigation}) => {
  let [recording, setRecording] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {bledata, bleModule, setBleState}: any = useData();
  const [result, setResult] = useState('');
  Tts.setDefaultLanguage('zh-CN');
  const isFocused = useIsFocused();
  useEffect(() => {
    bleModule.isPeripheralConnected().then((isConnected: any) => {
      if (isConnected && bleModule.peripheral) {
        setBleState(true);
      } else {
        setBleState(false);
        setRecording(false);
        setIsLoading(false);
        setResult('');
        bleModule.start();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'HomeSreen'}],
          }),
        );
        Alert.alert('蓝牙已断开');
      }
    });
  }, [isFocused]);

  function transposeMatrix(matrix: any) {
    return matrix[0].map((_: any, colIndex: any) =>
      matrix.map((row: any) => row[colIndex]),
    );
  }
  useEffect(() => {
    if (result !== '') {
      setTimeout(() => {
        Tts.speak(result);
      }, 100);
    }
  }, [result]);
  const sendData = () => {
    setIsLoading(true);
    if (bledata.current.one.length < 16) {
      Alert.alert('录制时间过短');
      setIsLoading(false);
      setResult('');
      return;
    }
    const tempDt = [
      bledata.current.one,
      bledata.current.two,
      bledata.current.three,
      Array.from({length: bledata.current.one.length}, () => '0'),
      Array.from({length: bledata.current.one.length}, () => '0'),
    ];
    const matrix = transposeMatrix(tempDt);
    // 接口
    axios
      .post('http://211.159.224.160:8000/predict/', {
        matrix: matrix,
      })
      .then(res => {
        setResult(res.data.result);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('网络错误');
        setIsLoading(false);
        setResult('');
      });
  };
  const handlePress = () => {
    setResult('');
    bledata.current = {
      one: [],
      two: [],
      three: [],
      four: [],
      five: [],
      six: [],
    };
    setRecording(true);
  };
  const handlePressOver = () => {
    setRecording(false);
    sendData();
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
      {result === '' ? (
        recording ? (
          <View>
            <Text style={{fontSize: 28, paddingTop: 120, color: '#000'}}>
              正在录制中……
            </Text>
          </View>
        ) : isLoading ? (
          <View
            style={{
              display: 'flex',
              paddingTop: 120,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="rgb(33, 150, 243)" />
          </View>
        ) : (
          <View style={{paddingTop: 0}}>
            <Text style={{fontSize: 48, paddingBottom: 50, color: '#000'}}>
              你好,
            </Text>
            <Text style={{fontSize: 32, color: '#000'}}>
              点击下方按钮,{'\n'}开始识别手势动作。
            </Text>
          </View>
        )
      ) : (
        <View>
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
          <View style={styles.textContainer}>
            <TypewriterText text={result} />
          </View>
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.circleBorder}>
          {recording ? (
            <TouchableOpacity onPress={handlePressOver} disabled={isLoading}>
              <View style={styles.square} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handlePress} disabled={isLoading}>
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
    // color: '#000',
    // position: 'absolute',
    // bottom: 50,
    // width: '100%',
    // height: 300,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#F7F7F7',
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
