import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CustomHeaderButton = () => {
  const navigation: any = useNavigation();

  const handlePress = () => {
    navigation.navigate('BlueConnect');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{marginRight: 10, color: 'black'}}>蓝牙连接</Text>
    </TouchableOpacity>
  );
};

export default CustomHeaderButton;
