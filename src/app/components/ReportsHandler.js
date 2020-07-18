import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import * as WebBroswer from 'expo-web-browser';
import Colors from "../../shared/constants/Colors";
import { Normaize } from "../../shared/core/Normaize";

const ReportHanlder = props => (

    <TouchableOpacity onPress={() => WebBroswer.openBrowserAsync(props.reportLink)}>


        <View style={styles.reoprtsListStyle}>
            <View style={[styles.circleColumn, props.styles || {}]} >
                <Text style={styles.circleColumnItemsDate}>{props.rptDate}</Text>
                <Text style={styles.circleColumnItemsMonth}>{props.rptYear}</Text>
            </View>


            <View style={{ flex: 15 }}>
                <View style={styles.resultsScreen_group4263}>
                    <Text style={styles.resultsScreen_group4263_notifications6f309c1d}><Text>Test Name: </Text>{props.name}</Text>
                    <Text style={styles.resultsScreen_group4263_notifications}><Text>Provider: </Text>{props.reportdetails}</Text>
                </View>
            </View>
            <View style={{ flex: 3, marginRight: 10, }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/pdf2.png')} style={styles.resultsScreen_icpdf} />
                </View>
            </View>

        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    reoprtsListStyle: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#D1D1D6',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultsScreen_icpdf: {
        width: 30,
        height: 30,
        marginLeft: 10
    },
    resultsScreen_group4263: {
        opacity: 1,
        backgroundColor: "transparent",
        marginLeft: 20,

    },
    resultsScreen_rectangle3820: {
        opacity: 1,
        backgroundColor: "rgba(0, 161, 222, 1)",
        borderRadius: 5,
        width: 80,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30
    },
    resultsScreen_view: {
        opacity: 1,
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0)",
        color: "rgba(255, 255, 255, 1)",
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
    },
    resultsScreen_group4263_notifications6f309c1d: {
        opacity: 1,
        width: 300,
        backgroundColor: "rgba(255, 255, 255, 0)",
        color: "rgba(0, 0, 0, 1)",
        fontSize: Normaize(14),
        fontWeight: "400",
        fontStyle: "normal",
    },

    resultsScreen_group4263_notifications: {
        opacity: 1,
        color: "#636363",
        fontSize: Normaize(13),
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: "left",
    },

    circleColumn: {
        width: 50,
        height: 60,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lowAllergy,
        marginLeft: 10
    },
    circleColumnItemsDate: {
        fontSize: Normaize(13),
        color: '#fff',

    },
    circleColumnItemsMonth: {
        fontSize: Normaize(13),
        color: '#fff',

    },
});

export default ReportHanlder;