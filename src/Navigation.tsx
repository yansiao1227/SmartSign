import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import BlueConnect from './BlueConnect';
import Sign from './Sign';
import Test from './Test';
import HomeScreen from './HomeScreen';
import QuickStart from './QuickStart';
import CustomHeaderButton from './components/CustomHeaderButton';
import {useData} from './model/DataContext';
const Stack = createStackNavigator();

export default function Navigation() {
  const {bleState}: any = useData();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: bleState ? '主页(已连接)' : '主页(未连接)',
            headerRight: () => <CustomHeaderButton />,
          }}
        />
        <Stack.Screen
          name="BlueConnect"
          component={BlueConnect}
          options={{title: '蓝牙模块'}}
        />
        <Stack.Screen
          name="QuickStart"
          component={QuickStart}
          options={{title: '快速开始'}}
        />
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
