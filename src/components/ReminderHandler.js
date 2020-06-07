import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import * as WebBroswer from 'expo-web-browser';
import Colors from "../constants/Colors";
import Svg, { Defs, Pattern, LinearGradient, Stop } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { } from 'react-native-svg';
import { Image as SvgImage } from 'react-native-svg';

const ReminderHandler = props => (

    <TouchableOpacity>
        <View style={styles.reoprtsListStyle}>
            <View style={[styles.circleColumn, props.styles || {}]} >
                {props.remiderImage}
            </View>
            <View style={{ flex: 15 }}>
                <View style={styles.resultsScreen_group4263}>
                    <Text style={styles.resultsScreen_group4263_notifications6f309c1d}>{props.remText}</Text>
                    <Text style={styles.resultsScreen_group4263_notifications}>{props.remDate}</Text>
                </View>
            </View>
        </View>

    </TouchableOpacity>
);

const styles = StyleSheet.create({
    reoprtsListStyle: {
        flexDirection: 'row',
        marginTop: 0,
        borderBottomWidth: 1,
        borderColor: '#D1D1D6',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleColumn: {
        width: 55,
        height: 55,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lowAllergy,
        marginLeft: 10
    },
    circleColumnItemsDate: {
        fontSize: 17,
        color: '#fff'
    },
    circleColumnItemsMonth: {
        fontSize: 17,
        color: '#fff'
    },
    resultsScreen_group4263: {
        opacity: 1,
        backgroundColor: "transparent",
        marginLeft: 20,

    },
    "resultsScreen_group4263_notifications6f309c1d": {
        "opacity": 1,
        width: '100%',
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(0, 0, 0, 1)",
        "fontSize": 17,
        "fontWeight": "400",
        "fontStyle": "normal",
    },

    "resultsScreen_group4263_notifications": {
        "opacity": 1,
        "color": "#636363",
        "fontSize": 15,
        "fontWeight": "400",
        "fontStyle": "normal",
        "textAlign": "left",


    },
});

export default ReminderHandler;