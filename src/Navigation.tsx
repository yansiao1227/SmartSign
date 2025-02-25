import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import BlueConnect from './BlueConnect';
import Sign from './Sign';
import HomeScreen from './HomeScreen';
import QuickStart from './QuickStart';
import CustomHeaderButton from './components/CustomHeaderButton';
import {useData} from './DataContext';
const Stack = createStackNavigator();
export default function Navigation() {
  const {bleState}: any = useData();
  useEffect(() => {
    console.log('Navigation.tsx', bleState);
  }, [bleState]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
