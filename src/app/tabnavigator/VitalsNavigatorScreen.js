import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import BloodPreasureNavigator from './vitalsNavigator/BloodPreasureNavigator';
import bmiNavigator from './vitalsNavigator/bmiNavigator';
import heightNavigator from './vitalsNavigator/heightNavigator';
import StatusBarType from '../components/StatusBarType';
import { StatusBar, View, Text } from 'react-native';



const DiagTopTab = createMaterialTopTabNavigator();


const INITAL_ROUTE_NAME = 'Blood';

export default function VitalNavigatorScreen({ navigation, route }) {
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
            <DiagTopTab.Navigator initialRouteName={INITAL_ROUTE_NAME}
                tabBarOptions={{
                    showIcon: true,
                    labelStyle: { fontSize: 13, color: '#fff' },
                    style: { backgroundColor: '#5773FF' },
                    pressColor: 'gray',
                    indicatorStyle: {
                        backgroundColor: 'red',
                        position: 'absolute'
                    }
                }}
                tabBarPosition="top"
            >
                <DiagTopTab.Screen
                    name="Blood"
                    component={BloodPreasureNavigator}
                    options={{
                        title: 'Blood Preasure',

                    }}
                />
                <DiagTopTab.Screen
                    name="BMI"
                    component={bmiNavigator}
                    options={{
                        title: 'BMI',

                    }}
                />

                <DiagTopTab.Screen
                    name="Height"
                    component={heightNavigator}
                    options={{
                        title: 'Height',

                    }}
                />


            </DiagTopTab.Navigator>
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
            return 'Vitals';
    }
}
