// HomeScreen.tsx

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useData} from './model/DataContext';
import {useIsFocused} from '@react-navigation/native';

const Home: React.FC<any> = ({navigation}) => {
  const {bleModule, setBleState}: any = useData();
  const isFocused = useIsFocused();
  useEffect(() => {
    bleModule.isPeripheralConnected().then((isConnected: any) => {
      if (isConnected && bleModule.peripheral) {
        setBleState(true);
      } else {
        setBleState(false);
        bleModule.start();
      }
    });
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        padding: 10,
        paddingTop: 0,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('QuickStart')}
        style={styles.container}>
        <Text style={styles.text}>快速开始</Text>
        <View style={styles.imageContainer}>
          <View style={{flex: 1}} />
          <Image
            style={{
              width: 90,
              height: 90,
              marginRight: 10,
            }}
            source={require('./images/quick.png')}
          />
          <Image
            style={{
              width: 85,
              height: 85,
            }}
            source={require('./images/arrow.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Conversion')}
        style={styles.container}>
        <Text
          style={[
            styles.text,
            {
              textAlign: 'right',
            },
          ]}>
          对话模式
        </Text>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: 85,
              height: 85,
            }}
            source={require('./images/arrow.png')}
          />
          <Image
            style={{
              marginLeft: 10,
              width: 120,
              height: 100,
            }}
            source={require('./images/chat.png')}
          />
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('VoiceScreen')}
        style={{marginTop: 20}}>
        <Text style={{fontSize: 20}}>测试语音</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('BlueToothScreen')}
        style={{marginTop: 10}}>
        <Text style={{fontSize: 20}}>测试蓝牙</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgb(221, 221, 221)',
    marginTop: 10,
    padding: 18,
    width: '100%',
  },
  text: {
    fontSize: 28,
    marginTop: -8,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default Home;
