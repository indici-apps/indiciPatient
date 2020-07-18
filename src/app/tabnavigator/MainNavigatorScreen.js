import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { memo } from 'react';

// import AppointmentScreen from './navigationscreens/AppointmentScreen';
// import CancelledScreen from './navigationscreens/CancelledScreen'
import { Text, View, StyleSheet, Image, StatusBar, Dimensions, Platform, TouchableOpacity } from 'react-native';


import AppointmentScreen from './appointmentNavigator/AppointmentScreen';
import CancelledScreen from './appointmentNavigator/CancelledScreen';
import CompletedScreen from './appointmentNavigator/CompletedScreen';
import MissedScreen from './appointmentNavigator/MissedScreen';
import Svg, { Defs, Pattern, LinearGradient, Stop } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { } from 'react-native-svg';
import { Image as SvgImage } from 'react-native-svg';
import Header from '../components/Header'
import CustomStatusBar from '../components/CustomStatusBar';

import { Normaize } from "../../shared/core/Normaize";

import TabBarIcon from '../components/TabBarIcon';
import { enableScreens } from 'react-native-screens';
enableScreens();

//const HomeScreen = ({ navigation }) => (

const Tab = createMaterialTopTabNavigator();
const INITAL_ROUTE_NAME = 'Appointment';


export default function BottomTabNavigator({ navigation, route }) {

  const [isLoading, setIsLoading] = React.useState(true);
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  React.useEffect(() => {
    // // setTimeout(() => {
    // //     setIsLoading(false);
    // // }, 1500);
    // setIsLoading(false);
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
      {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
      {/* <Header title="My Appointments" /> */}
      <Tab.Navigator
        tabBarOptions={{
          showIcon: true,
          labelStyle: { fontSize: 12, color: '#fff' },
          activeTintColor: '#e91e63',
          style: { backgroundColor: '#00A1DE' },
          indicatorStyle: {
            backgroundColor: '#C6E9FB',
            position: 'absolute'
          }
        }}
        tabBarPosition="top"
        initialLayout={{ width: Dimensions.get('window').width }}
      >
        <Tab.Screen name="Current" component={AppointmentScreen} options={{
          tabBarIcon: () => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/icmydoctors.png')}
            />
          )
        }} />
        <Tab.Screen name="Complete" component={CompletedScreen} options={{
          tabBarIcon: () => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/icmedications.png')}
            />
          )
        }} />
        <Tab.Screen name="Missed" component={MissedScreen} options={{
          tabBarIcon: () => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/icehrfiles.png')}
            />
          )
        }} />
        <Tab.Screen name="Canceled" component={CancelledScreen} options={{
          tabBarIcon: () => (
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/icfavarticle.png')}
            />
          )
        }} />
      </Tab.Navigator>
      <TouchableOpacity onPress={() => navigation.navigate('BookApp')}  style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );

  //
}
// <BottomTab.Navigator initialRouteName={INITAL_ROUTE_NAME}
//   tabBarOptions={{
//     showIcon: true,
//     labelStyle: { fontSize: 10, color: '#fff' },
//     style: { backgroundColor: '#000' },
//   }}
// >
//   <BottomTab.Screen
//     name="Home"
//     component={AppointmentScreen}
//     options={{
//       title: 'Future Appointments',

//     }}
//   />
//   <BottomTab.Screen
//     name="Links"
//     component={CancelledScreen}
//     options={{
//       title: 'Completed Appointments',

//     }}
//   />


// </BottomTab.Navigator>



const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: Normaize(30),
    color: 'white'
  },

});


function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name;

  switch (routeName) {
    case 'None':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
    default:
      return 'My Appointments';
  }
}

//export default memo(MainNavigatorScreen);
// export default function MainNavigatorScreen({navigation, route}){
//     return(

//     );
// }