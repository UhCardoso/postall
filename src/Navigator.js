import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const StackAuth = createStackNavigator();

// Authentication flow screens
const AuthRoutes = () => {
    return (
        <StackAuth.Navigator initialRouteName="login">
          <StackAuth.Screen name="register" component={Register} options={{title: 'Registrar-se'}}/>
          <StackAuth.Screen name="login" component={Login} options={{
              headerShown: false,
              title: 'Login'
            }}/>
        </StackAuth.Navigator>
      );
}

// Profile screens or call authentication flow
const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="auth">
      <Stack.Screen name="profileView" component={Profile} />
      <Stack.Screen name="auth" component={AuthRoutes} options={{
          headerShown: false,
        }}/>
    </Stack.Navigator>
  );
};

const MenuNavigator = () => {
    return (
        <>
        <StatusBar
            backgroundColor="#fff" barStyle="dark-content"
        />
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="feed"
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: { backgroundColor: '#fff' },
                    headerShown: false
                }}
            >
                <Tab.Screen
                    name="feed"
                    component={Feed}
                    options={{
                        title: 'Feed',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="addPhoto"
                    component={AddPhoto} 
                    options={{
                        title: 'Add Picture',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="camera" size={size} color={color} />
                        ),
                    }}
                />
                {/* Call profile and authentication flow screens */}
                <Tab.Screen
                    name="profile"
                    component={ProfileStack} 
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="user" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
        </>
    );
};

export default MenuNavigator;
