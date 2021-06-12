import React from 'react';

//colors
import { Colors } from './../components/styles';
const { darkLight, brand, primary, tertiary, secondary } = Colors;

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Oauthredirect from './../screens/Oauthredirect';
import Setting from './../screens/Setting';

const Stack = createStackNavigator();

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';
import linking from './linking';

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer style={{ backgroundColor: 'red' }} linking={linking} >
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: tertiary,
              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
          >

            <Stack.Screen name="login" component={Login} />
            <Stack.Screen options={{ headerTintColor: primary }} name="welcome" component={Welcome} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="oauthredirect" component={Oauthredirect} />
            <Stack.Screen name="setting" component={Setting} />

            {/* {storedCredentials ? (
              <>
                <Stack.Screen options={{ headerTintColor: primary }} name="Welcome" component={Welcome}/>
                <Stack.Screen name="oauthredirect" component={Oauthredirect} />
                <Stack.Screen name="setting" component={Setting} />
              </>
            ) : (
              <>
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="signup" component={Signup} />
                <Stack.Screen name="oauthredirect" component={Oauthredirect} />
                <Stack.Screen name="setting" component={Setting} />
              </>
            )} */}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
