import React from 'react';

//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import { View } from "react-native";

import LongWebDiag from '../pages/diagnosis/LongWebDiag';
import AllWebDiag from '../pages/diagnosis/AllWebDiag';


import { SafeAreaView } from "react-native";

const LongDiagStack = createStackNavigator();
const AllDiagStack = createStackNavigator();

import { enableScreens } from 'react-native-screens';


enableScreens();
const Tab = createMaterialTopTabNavigator();

const MedicationNavigator = () => {



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
                component={LongDiagStackScreen}
                options={{
                    tabBarLabel: 'Long Term',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={AllDiagStackScreen}
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

export default MedicationNavigator;

const LongDiagStackScreen = ({ navigation }) => (
    <LongDiagStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <LongDiagStack.Screen name="Home" component={LongWebDiag} options={{
            title: 'Long Term Diagnosis',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </LongDiagStack.Navigator>
);

const AllDiagStackScreen = ({ navigation }) => (
    <AllDiagStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <AllDiagStack.Screen name="Details" component={AllWebDiag} options={{
            title: 'All Diagnosis',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </AllDiagStack.Navigator>
);

