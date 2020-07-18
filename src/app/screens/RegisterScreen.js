import React, { memo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import BackButton from '../components/BackButton'


const RegisterScreen = ({ navigation }) => (

    <View >
        <Text>Welcome to RegisterScreen Screen</Text>
        <Button
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
        />
        <BackButton goBack={() => navigation.navigate('Home')} />
    </View>
);
export default memo(RegisterScreen);


