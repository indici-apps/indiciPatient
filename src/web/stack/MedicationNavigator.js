import React from 'react';

//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import { View } from "react-native";

import LongWebMeds from '../pages/medications/LongWebMeds';
import AllWebMeds from '../pages/medications/AllWebMeds';



import { SafeAreaView } from "react-native";

const LongMedStack = createStackNavigator();
const AllMedStack = createStackNavigator();

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
                component={LongMedStackScreen}
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
                component={AllMedStackScreen}
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

const LongMedStackScreen = ({ navigation }) => (
    <LongMedStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <LongMedStack.Screen name="Home" component={LongWebMeds} options={{
            title: 'Long Term Medications',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </LongMedStack.Navigator>
);

const AllMedStackScreen = ({ navigation }) => (
    <AllMedStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <AllMedStack.Screen name="Details" component={AllWebMeds} options={{
            title: 'All Medications',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </AllMedStack.Navigator>
);

