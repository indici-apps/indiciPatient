import React, { memo } from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity  , Image } from 'react-native';


const HomeScreen = ({ navigation }) => (
    //
    <View>
        <Text>Welcome to Home Screen</Text>
        <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
        />

        <Button
            title="Go to tABS"
            onPress={() => navigation.navigate('Appnav')}
        />
        <Button
            title="Go to Back"
            onPress={() => navigation.navigate('Terms')}
        />

        <TouchableOpacity >
            <Image
                source={require('../../assets/getStarted.png')}
                
            />
        </TouchableOpacity>

    </View>
);
export default memo(HomeScreen);