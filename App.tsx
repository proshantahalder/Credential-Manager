import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddCredentialScreen from './screens/AddCredentialScreen';
import ViewCredentialScreen from './screens/ViewCredentialScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen 
            name="Login"
            options={{ headerShown: false }} // This will hide the header only for the Login screen
          >
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ headerShown: true, title: "Credential Manager" }} // Explicitly show header for Home screen
            />
            <Stack.Screen 
              name="AddCredential" 
              component={AddCredentialScreen}
              options={{ headerShown: true, title: "Add Credential"  }} // Explicitly show header for AddCredential screen
            />
            <Stack.Screen 
              name="ViewCredential" 
              component={ViewCredentialScreen}
              options={{ headerShown: true, title: "View Credential" }} // Explicitly show header for ViewCredential screen
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;