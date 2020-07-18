import React, { useCallback } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';
import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";

const Overdue = props => {
    return (
        <View style={styles.screenContainer}>
            <Text style={{ marginTop: 10, }}>No Records Found</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center', alignItems: 'center'

    },
});
export default Overdue;
