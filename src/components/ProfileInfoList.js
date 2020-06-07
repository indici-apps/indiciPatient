import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList } from 'react-native';


const ProfileInfoList = props => (
    <View style={styles.profileBody}>
        <Text>{props.title}</Text>
        <Text>{props.profileData}</Text>
    </View>
);

const styles = StyleSheet.create({
    profileBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        marginTop: 10
    }
});

export default ProfileInfoList;