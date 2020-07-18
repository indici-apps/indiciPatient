import React from 'react';

//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import { View } from "react-native";

import PendingWebInvoices from '../pages/accounts/PendingWebInvoices';
import AllWebInvoices from '../pages/accounts/AllWebInvoices';


import { SafeAreaView } from "react-native";

const PendingInStack = createStackNavigator();
const AllInStack = createStackNavigator();

import { enableScreens } from 'react-native-screens';


enableScreens();
const Tab = createMaterialTopTabNavigator();

const AccountsNavigator = () => {



    return (

        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            tabBarPosition="bottom"
            tabBarOptions={{
                indicatorStyle: {
                    backgroundColor: '#665EFF',
                    position: 'relative'
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={PendingInStackScreen}
                options={{
                    tabBarLabel: 'Pending',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={AllInStackScreen}
                options={{
                    tabBarLabel: 'All',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-notifications" color={color} size={26} />
                    ),
                }}
            />

        </Tab.Navigator>
    );


};

export default AccountsNavigator;

const PendingInStackScreen = ({ navigation }) => (
    <PendingInStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <PendingInStack.Screen name="Home" component={PendingWebInvoices} options={{
            title: 'Pending Invoices',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </PendingInStack.Navigator>
);

const AllInStackScreen = ({ navigation }) => (
    <AllInStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <AllInStack.Screen name="Details" component={AllWebInvoices} options={{
            title: 'All Invoices',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </AllInStack.Navigator>
);

