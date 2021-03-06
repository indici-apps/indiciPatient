import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AllDiag from './diagnosisNavigator/AllDiag';
import LongTermsDiag from './diagnosisNavigator/LongTermsDiag';
import StatusBarType from '../components/StatusBarType';
import { StatusBar, View, Text } from 'react-native';
const DiagTopTab = createMaterialTopTabNavigator();
const INITAL_ROUTE_NAME = 'Dashbaord';

export default function DiagnosisNavigatorScreen({ navigation, route }) {
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
                    labelStyle: { fontSize: 13, color: '#838383' },
                    style: { backgroundColor: '#F3F3F3' },
                    pressColor: 'gray',
                    indicatorStyle: {
                        backgroundColor: '#665EFF',
                        position: 'relative'
                    }
                }}
                tabBarPosition="top"
            >
                <DiagTopTab.Screen
                    name="LongTermDiag"
                    component={LongTermsDiag}
                    options={{
                        title: 'Long Term',
                    }}

                />
                <DiagTopTab.Screen
                    name="AllDiag"
                    component={AllDiag}
                    options={{
                        title: 'All',

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
            return 'Diagnosis';
    }
}
