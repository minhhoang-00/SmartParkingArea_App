import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';


import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import MainContainer from './Screens/MainContainer';
import ForgotPassword from './Screens/ForgotPassword';
import WelcomePage from './Screens/WelcomePage';
import WelcomePageAdmin from './Screens/WelcomePage-Admin';
import AdminPanel from './Screens/AdminPanel';
import SystemInforPanel from './Screens/SystemInforPanel';



const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="MainContainer" component={MainContainer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
