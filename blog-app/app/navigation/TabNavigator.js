import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'
import React from 'react';
import Search from '../components/Search';
import AppNavigator from './AppNavigator';

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen options={{ tabBarIcon: ({ focused, color, size }) => { return <AntDesign name="home" size={size} color={color} /> } }} name="HomeScreen" component={AppNavigator} />
            <Tab.Screen options={{ tabBarIcon: ({ focused, color, size }) => { return <AntDesign name="search1" size={size} color={color} /> } }} name="Search" component={Search} />
        </Tab.Navigator>
    )
}

export default TabNavigator