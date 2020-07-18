import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// import AllDiag from './diagnosisNavigator/AllDiag';
// import LongTermsDiag from './diagnosisNavigator/LongTermsDiag';

import Due from "./immuneNavigator/Due";
import Overdue from "./immuneNavigator/Overdue";
import Administred from "./immuneNavigator/Administred";
import AllImm from "./immuneNavigator/AllImm";



import StatusBarType from '../components/StatusBarType';
import { StatusBar, View, Text } from 'react-native';
const ImmuneTopTab = createMaterialTopTabNavigator();
const INITAL_ROUTE_NAME = 'Due';

export default function ImmuneNavigatorScreen({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 50);
    }, []);


    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Loading.....</Text>
        </View>
    }
    return (
        <View style={{ height: '100%', width: '100%', flex: 1, flexDirection: 'column' }}>
            <StatusBarType />
            {/* <Header title="My Appointments" /> */}
            <ImmuneTopTab.Navigator initialRouteName={INITAL_ROUTE_NAME}
                tabBarOptions={{
                    showIcon: true,
                    labelStyle: { fontSize: 13, color: '#838383' },
                    style: { backgroundColor: '#F3F3F3' },
                    pressColor: 'gray',
                    indicatorStyle: {
                        backgroundColor: '#665EFF',
                        position: 'absolute'
                    }
                }}
                tabBarPosition="top"
            >
                <ImmuneTopTab.Screen
                    name="Due"
                    component={Due}
                    options={{
                        title: 'Due',
                    }}
                />
                <ImmuneTopTab.Screen
                    name="Overdue"
                    component={Overdue}
                    options={{
                        title: 'Overdue',
                    }}
                />
                {/* <ImmuneTopTab.Screen
                    name="Administred"
                    component={Administred}
                    options={{
                        title: 'Admin',
                    }}
                /> */}
                <ImmuneTopTab.Screen
                    name="AllImm"
                    component={AllImm}
                    options={{
                        title: 'All',
                    }}
                />
            </ImmuneTopTab.Navigator>
        </View>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name;

    switch (routeName) {
        case 'None':
            return 'How to get started';
        case 'Links':
            return 'Links to learn more';
        default:
            return 'Immunisation';
    }
}
