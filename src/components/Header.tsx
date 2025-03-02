import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface HeaderProps {
  isConnected: boolean;
  isMonitoring: boolean;
  deviceLen: number;
  scaning: boolean;
  disabled: boolean;
  onPress: () => void;
  goNextPage: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isConnected,
  isMonitoring,
  deviceLen,
  scaning,
  disabled,
  onPress,
  goNextPage,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.buttonView, {opacity: disabled ? 0.7 : 1}]}
        disabled={disabled}
        onPress={onPress}>
        <Text style={[styles.buttonText]}>
          {scaning ? '正在搜索中' : isConnected ? '断开蓝牙连接' : '搜索蓝牙'}
        </Text>
      </TouchableOpacity>
      {/* {isMonitoring && (
        <TouchableOpacity style={[styles.buttonViewGreen]} onPress={goNextPage}>
          <Text style={[styles.buttonText]}>去做手势</Text>
        </TouchableOpacity>
      )} */}
      <Text style={{marginLeft: 10, marginTop: 10}}>
        {isConnected ? '当前连接的设备' : '可用设备: ' + deviceLen}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  buttonView: {
    backgroundColor: 'rgb(33, 150, 243)',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonViewGreen: {
    backgroundColor: '#52c41a',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Header;
