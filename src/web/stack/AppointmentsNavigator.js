import React from 'react';

//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import { View } from "react-native";

import FutureWebScreen from '../pages/appointment/FutureWebScreen';
import CompletedWebScreen from '../pages/appointment/CompletedWebScreen';
import CancelledWebScreen from '../pages/appointment/CancelledWebScreen';
import MissedWebScreen from '../pages/appointment/MissedWebScreen';


import { SafeAreaView } from "react-native";

const FutureStack = createStackNavigator();
const CompleteStack = createStackNavigator();
const MissedStack = createStackNavigator();
const CancelledStack = createStackNavigator();
import { enableScreens } from 'react-native-screens';


enableScreens();
const Tab = createMaterialTopTabNavigator();

const AppointmentsNavigator = () => {

   

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
                component={FutureStackScreen}
                options={{
                    tabBarLabel: 'Future',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={CompleteStackScreen}
                options={{
                    tabBarLabel: 'Completed',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-notifications" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={MissedStackScreen}
                options={{
                    tabBarLabel: 'Missed',
                    tabBarColor: '#694fad',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-person" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Explore"
                component={CancelledStackScreen}
                options={{
                    tabBarLabel: 'Cancelled',
                    tabBarColor: '#d02860',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-aperture" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );


};

export default AppointmentsNavigator;

const FutureStackScreen = ({ navigation }) => (
    <FutureStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <FutureStack.Screen name="Home" component={FutureWebScreen} options={{
            title: 'Future Appointments',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </FutureStack.Navigator>
);

const CompleteStackScreen = ({ navigation }) => (
    <CompleteStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <CompleteStack.Screen name="Details" component={CompletedWebScreen} options={{
            title: 'Completed Appointments',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </CompleteStack.Navigator>
);

const MissedStackScreen = ({ navigation }) => (
    <MissedStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <MissedStack.Screen name="Explore" component={MissedWebScreen} options={{
            title: 'Missed Appointments',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </MissedStack.Navigator>
);

const CancelledStackScreen = ({ navigation }) => (
    <CancelledStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <CancelledStack.Screen name="Explore" component={CancelledWebScreen} options={{
            title: 'Cancelled Appointments',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </CancelledStack.Navigator>
);