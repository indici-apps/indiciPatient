import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';



import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";

let pageNumber = 1;


const LongWebMeds = props => {
    const { colors } = useTheme();
    const theme = useTheme();
    return (
        <View style={styles.container}>
           
        </View>
    );
};




export default LongWebMeds;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',

    },
    wrapContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});