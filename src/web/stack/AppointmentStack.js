import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native";

import FutureWebScreen from "../pages/appointment/FutureWebScreen";
import CompletedWebScreen from "../pages/appointment/CompletedWebScreen";
import MissedWebScreen from "../pages/appointment/MissedWebScreen";
import CancelledWebScreen from "../pages/appointment/CancelledWebScreen";


//set stack
const FutureStack = createStackNavigator();
const CompleteStack = createStackNavigator();
const MissedStack = createStackNavigator();
const CancelledStack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();


const AppointmentStack = () => {

    <Tab.Navigator
        initialRouteName="Future"
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
            name="Future"
            component={FutureStackScreen}
            options={{
                tabBarLabel: 'Upcomming Appointments',
                tabBarColor: '#009387',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-home" color={color} size={26} />
                ),
            }}
        />

        <Tab.Screen
            name="Complete"
            component={CompleteStackScreen}
            options={{
                tabBarLabel: 'Completed Appointmnts',
                tabBarColor: '#1f65ff',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-notifications" color={color} size={26} />
                ),
            }}
        />

        <Tab.Screen
            name="Missed"
            component={MissedStackScreen}
            options={{
                tabBarLabel: 'Missed Appointmnts',
                tabBarColor: '#1f65ff',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-notifications" color={color} size={26} />
                ),
            }}
        />

        <Tab.Screen
            name="Cancelled"
            component={CancelledStackScreen}
            options={{
                tabBarLabel: 'Cancelled Appointmnts',
                tabBarColor: '#1f65ff',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-notifications" color={color} size={26} />
                ),
            }}
        />

    </Tab.Navigator>

}

export default AppointmentStack;


const FutureStackScreen = ({ navigation }) => (
    <FutureStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
        <FutureStack.Screen name="Future" component={FutureWebScreen} options={{
            title: 'Overview',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </FutureStack.Navigator>
);


const CompleteStackScreen = ({ navigation }) => (
    <CompleteStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
        <CompleteStack.Screen name="Complete" component={CompletedWebScreen} options={{
            title: 'Overview',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </CompleteStack.Navigator>
);

const MissedStackScreen = ({ navigation }) => (
    <MissedStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
        <MissedStack.Screen name="Missed" component={MissedWebScreen} options={{
            title: 'Overview',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </MissedStack.Navigator>
);


const CancelledStackScreen = ({ navigation }) => (
    <CancelledStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
        <CancelledStack.Screen name="Cancelled" component={CancelledWebScreen} options={{
            title: 'Overview',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </CancelledStack.Navigator>
);

