import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login';
import Home from './screen/home';
import Critere from './screen/critere';
import DemandeEnvoyee from './screen/demandeEnvoye';
import Chat from './screen/messagerie';
import DemandeRecue from './screen/demandeRecue';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Critere" component={Critere} options={{ headerShown: false }} />
        <Stack.Screen name="DemandeEnvoyee" component={DemandeEnvoyee} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        <Stack.Screen name='DemandeRecue' component={DemandeRecue}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
