import React, { Component, useEffect } from "react";
import { View, Text, Dimensions, Button, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import {
    NavigationContainer, DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from "react-native-paper";

import { DrawerContent } from "./DrawerContent";

import HomeScreen from "./pages/HomeScreen";
import RootStackScreen from "./stack/RootStackScreen";
import AppointmentsNavigator from "./stack/AppointmentsNavigator";
import MedicationNavigator from "./stack/MedicationNavigator";
import DiagnosisNavigator from "./stack/DiagnosisNavigator";
import AllergiesWebScreen from "./pages/AllergiesWebScreen";
import ResultsWebScreen from "./pages/ResultsWebScreen";
import ResourcesWebScreen from "./pages/ResourcesWebScreen";
import TimelineWebScreen from "./pages/TimelineWebScreen";
import AccountsNavigator from "./stack/AccountsNavigator";

import { fetchToken } from '../shared/actions/TokenActions';  //"../actions/TokenActions";
import { AuthContext } from "../shared/core/context";
import { enableScreens } from 'react-native-screens';

enableScreens();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const secondStack = createStackNavigator();

const NavigationDrawerStructure = (props) => {
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                <Image
                    source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
                    style={{ width: 25, height: 25, marginLeft: 5 }}
                />
            </TouchableOpacity>
        </View>
    );
}


function firstScreenStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen
                name="HomePage"
                component={HomeScreen}
                options={{
                    title: 'Home Page', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function AllergiesStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen
                name="HomePage"
                component={AllergiesWebScreen}
                options={{
                    title: 'Allergies', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function ResultsStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen
                name="HomePage"
                component={ResultsWebScreen}
                options={{
                    title: 'Results & Reports', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}


function ResourceStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen
                name="HomePage"
                component={ResourcesWebScreen}
                options={{
                    title: 'Resources', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function TimelineStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen
                name="HomePage"
                component={TimelineWebScreen}
                options={{
                    title: 'Timeline', //Set Header Title
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

const App = (props) => {

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
    };

    //default theme
    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: '#ffffff',
            text: '#333333'
        }
    }

    //dark theme
    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: '#333333',
            text: '#ffffff'
        }
    }

    //chose theme
    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    const authContext = React.useMemo(() => ({
        signIn: async (foundUser) => {
            const userToken = String(foundUser[0].userToken);
            const userName = foundUser[0].username;
            dispatch({ type: 'LOGIN', id: userName, token: userToken });
        },
        signOut: async () => {
            dispatch({ type: 'LOGOUT' });
        },
        signUp: () => {
        },
        toggleTheme: () => {
            setIsDarkTheme(isDarkTheme => !isDarkTheme);
        }
    }), []);



    //token setup 
    const { Token, isFetching } = props.Token;


    const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
    React.useEffect(() => {
        const onDimensionsChange = ({ window }) => {
            setDimensions(window);
        };
        Dimensions.addEventListener('change', onDimensionsChange);

        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    }, []);


    // useEffect(() => {
    //     setTimeout(async () => {
    //         // setIsLoading(false);
    //         let userToken;
    //         userToken = null;
    //         dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    //     }, 1000);
    // }, []);


    React.useEffect(() => {

        setTimeout(async () => {
            // setIsLoading(false);
            let userToken;
            userToken = null;
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000);

        //get token
        if (Token == null || Token == '') {
            props.getToken();
        } else {
            alert('Token is already present');
        }

    }, []);


    const isLargeScreen = dimensions.width >= 1024;


    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }




    if (Token == null || Token == '') {
        return <View style={styles.splashScreen}>
            <Image
                style={styles.splashScreenlogo}
                source={require('../assets/brand_logo.png')} />
            <View style={{ marginTop: 150 }}>
                <ActivityIndicator size="large" color="#00A1DE" />
            </View>
        </View>
    }

    else {
        return (

            <PaperProvider theme={theme}>
                <AuthContext.Provider value={authContext}>
                    <NavigationContainer theme={theme}>
                        {loginState.userToken !== null ? (
                            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
                                drawerType={isLargeScreen ? 'permanent' : 'front'}>
                                <Drawer.Screen name="IndiciHome" component={firstScreenStack} />
                                <Drawer.Screen name="Appointments" component={AppointmentsNavigator} />
                                <Drawer.Screen name="Medications" component={MedicationNavigator} />
                                <Drawer.Screen name="Diagnosis" component={DiagnosisNavigator} />
                                <Drawer.Screen name="Allergies" component={AllergiesStack} />
                                <Drawer.Screen name="Results" component={ResultsStack} />
                                <Drawer.Screen name="Resources" component={ResourceStack} />
                                <Drawer.Screen name="Timeline" component={TimelineStack} />
                                <Drawer.Screen name="Accounts" component={AccountsNavigator} />
                                
                            </Drawer.Navigator>

                        ) : <RootStackScreen />}
                    </NavigationContainer>
                </AuthContext.Provider>
            </PaperProvider>
        );
    }

};


const styles = StyleSheet.create({
    splashScreen: {
        opacity: 1,
        position: 'relative',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    splashScreenlogo: {
        opacity: 1,
        position: 'absolute',
        width: 340,
        height: 99,
    }
});


function mapStateToProps(state) {
    return {
        Token: state.Token
    }
}
function mapDispatchToProps(disptach) {
    return {
        getToken: () => disptach(fetchToken())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)