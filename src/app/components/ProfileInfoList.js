import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const ProfileInfoList = props => (
    <View style={styles.profileBody}>
        <Text>{props.title}</Text>
        <Text>{props.profileData}</Text>
    </View>
);

const styles = StyleSheet.create({
    profileBody: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        marginTop: 10,
    }
});

export default ProfileInfoList;