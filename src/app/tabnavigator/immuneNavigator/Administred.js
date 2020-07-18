import React, { useCallback } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';
import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";

const Administred = props => {
    return (
        <View style={styles.screenContainer}>
            <Text>Hello World</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",

    },
});
export default Administred;
