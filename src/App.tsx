import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from './Home';
import Sign from './Sign';
import {DataProvider} from './DataContext';
const Stack = createStackNavigator();

function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name="HomePage" component={Home} />
          <Stack.Screen name="NextPage" component={Sign} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;
