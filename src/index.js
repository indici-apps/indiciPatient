import React, { memo } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    HomeScreen,
    RegisterScreen,
    LoginScreen,
    TermsConditionScreen,
    ResultReportScreen,
    AllergiesScreen,
    TimelineScreen,
    RemindersScreen,
    ProfileScreen,
    QrScanScreen,
    LoginHelpScreen,
} from './screens';
import MainNavigatorScreen from './tabnavigator/MainNavigatorScreen';
import HomeNavigatorScreen from './tabnavigator/HomeNavigatorScreen';
import DiagnosisNavigatorScreen from './tabnavigator/DiagnosisNavigatorScreen';
import MedicationNavigatorScreen from './tabnavigator/MedicationNavigatorScreen';
import AccountsNavigatorScreen from './tabnavigator/AccountsNavigatorScreen';
import VitalsNavigatorScreen from "./tabnavigator/VitalsNavigatorScreen";
import { StatusBar, Platform, View, StyleSheet, Image } from 'react-native';


import { AuthContext } from './core/context'

const Stack = createStackNavigator();


const AuthStack = createStackNavigator(); //authentication stact
const HomeStack = createStackNavigator();  //if user is logged in already

const AuthStackScreens = () => (
    <AuthStack.Navigator
        screenOptions={{
            headerShown: false,
            headerTitleAlign: 'center'
        }} initialRouteName={"Terms"}>
        <AuthStack.Screen name="Terms" component={TermsConditionScreen} />
        <AuthStack.Screen name="Details" component={RegisterScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen options={
            {
                headerShown: true,
                headerTransparent: true,
                title: 'Login Help',
                headerTitleStyle: {fontSize: 25},
                headerStyle:{
                    opacity: 0.9,
                },
                headerTintColor: '#fff'
            }
        } name="LoginHelp" component={LoginHelpScreen} />
    </AuthStack.Navigator>
)
const SessionStackScreens = () => (
    <HomeStack.Navigator
        screenOptions={{
            headerShown: false,
            headerTitleAlign: 'center',
        }} initialRouteName={"Dashboard"}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: true }} name="Appnav" component={MainNavigatorScreen} />
        <Stack.Screen name="Dashboard" component={HomeNavigatorScreen} />
        <Stack.Screen options={{ headerShown: true, title: "Results & Reports" }} name="Results" component={ResultReportScreen} />
        <Stack.Screen options={{ headerShown: true, title: "Allergies" }} name="Allergies" component={AllergiesScreen} />
        <Stack.Screen options={{ headerShown: true, title: "Diagnosis" }} name="Diagnosis" component={DiagnosisNavigatorScreen} />
        <Stack.Screen options={{ headerShown: true, title: "Medications" }} name="Medications" component={MedicationNavigatorScreen} />
        <Stack.Screen options={{ headerShown: true, title: "Timeline" }} name="Timeline" component={TimelineScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Reminders' }} name="Reminders" component={RemindersScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Accounts' }} name="Accounts" component={AccountsNavigatorScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Profile' }} name="Profile" component={ProfileScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'QR Scan' }} name="Scanner" component={QrScanScreen} />
        <Stack.Screen options={{ headerShown: true, title: 'Vitals' }} name="Vitals" component={VitalsNavigatorScreen} />
    </HomeStack.Navigator>
)

//creating the root stack to loadd all the screens at once
const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
    <RootStack.Navigator headerMode="none">
        {userToken ? (
            <RootStack.Screen
                name="Home"
                component={SessionStackScreens}

            />
        ) : (
                <RootStack.Screen
                    name="Auth"
                    component={AuthStackScreens}

                />
            )}
    </RootStack.Navigator>
)
const App = props => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const authContext = React.useMemo(() => {
        return {
            signIn: () => {
                setIsLoading(false);
                setUserToken("asdf");
                //alert(email);
            },
            signOut: () => {
                setIsLoading(false);
                setUserToken(null);
            }
        };
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);


    if (isLoading) {
        return <View style={styles.splashScreen}>
            <Image
                style={styles.splashScreenlogo}
                source={require('../assets/brand_logo.png')}
            />
        </View>
    }
    return (



        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}
                <RootStackScreen userToken={userToken} />
            </NavigationContainer>
        </AuthContext.Provider>


    );
}
// function App() {


//     return (

//         <NavigationContainer>
//             {Platform.OS === 'ios' && <StatusBar barStyle='dark-content'/>}
//             <Stack.Navigator screenOptions={{
//                 headerShown: false,
//                 headerTitleAlign: 'center'
//             }} initialRouteName={"Terms"}>

//                 <Stack.Screen headerShown="false" name="Home" component={HomeScreen} />
//                 <Stack.Screen name="Details" component={RegisterScreen} />
//                 <Stack.Screen name="Login" component={LoginScreen} />
//                 <Stack.Screen name="Appnav" component={MainNavigatorScreen} />
//                 <Stack.Screen name="Dashboard" component={HomeNavigatorScreen} />
//                 <Stack.Screen name="Terms" component={TermsConditionScreen}/>

//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

const styles = StyleSheet.create({
    splashScreen: {
        opacity: 1,
        position: 'relative',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: "row",
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
export default App;