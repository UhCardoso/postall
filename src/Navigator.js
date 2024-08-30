import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';

const Tab = createBottomTabNavigator();

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
                    component={AddPhoto} // Substitua por seu componente AddPhoto quando disponível
                    options={{
                        title: 'Add Picture',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="camera" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="profile"
                    component={Feed} // Substitua por seu componente Profile quando disponível
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
