import React, { memo } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DashbaordHome from './dashbaordNavigator/DashbaordHome';
import SettingsHome from './dashbaordNavigator/SettingsHome'


const BottomTab = createMaterialTopTabNavigator();
const INITAL_ROUTE_NAME = 'Dashbaord';

const HomeNavigatorScreen = props => {
    return (
        <BottomTab.Navigator initialRouteName={INITAL_ROUTE_NAME}
            tabBarOptions={{
                showIcon: true,
                labelStyle: { fontSize: 13, color: '#838383' },
                style: { backgroundColor: '#F3F3F3' },
                pressColor: 'gray',
                indicatorStyle:{
                    backgroundColor: '#665EFF',
                    position: 'relative'
                }
            }}
            tabBarPosition ="bottom"
        >
            <BottomTab.Screen
                name="Home"
                component={DashbaordHome}
                options={{
                    title: 'Home',

                }}
            />
            <BottomTab.Screen
                name="Links"
                component={SettingsHome}
                options={{
                    title: 'Settings',

                }}
            />


        </BottomTab.Navigator>
    );
};

export default HomeNavigatorScreen;