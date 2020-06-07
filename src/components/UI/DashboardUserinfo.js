import React, { memo, Component } from 'react';
import { View, StyleSheet, Text, TextInput as Input, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DashboardUserinfo = props => {
    return (
        <View style={styles.loginMenu}>
            <View style={styles.dashboard_content_text}>
                <Text style={styles.dashboard_content_text_mariaSnow}>Maria Snow</Text>
                <Text style={styles.dashboard_content_text_sanFranciscoCa}>Preferred Name: Snow</Text>
                <Text style={styles.dashboard_content_text_x20Years}>NHI: ABC12345</Text>
            </View>
            <View style={styles.profile_logout_btn}>
                <TouchableOpacity onPress={props.logout}>
                    <View style={styles.profile_logout_btn_view}>
                        <Text style={styles.profile_logout_btn_text}>{props.btnText}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loginMenu: {
        flexDirection: "row",
        width: wp('90%'),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginLeft: 10,
    },

    dashboard_content_text: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: wp('60%'),
    },

    profile_logout_btn: {
        marginTop: 10,
    },

    dashboard_content_text_mariaSnow: {
        color: "rgba(69, 79, 99, 1)",
        fontSize: hp('3.5%'),
        fontWeight: "bold",
        fontStyle: "normal",
        textAlign: "left",
    },
    dashboard_content_text_sanFranciscoCa: {
        color: "rgba(120, 132, 158, 1)",
        fontSize: hp('2.65%'),
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: "left",
        width: 250,
        marginTop: 2,

    },

    dashboard_content_text_x20Years: {
        opacity: 1,
        backgroundColor: "rgba(255, 255, 255, 0)",
        color: "rgba(120, 132, 158, 1)",
        fontSize: hp('2.5%'),
        fontWeight: "400",
        fontStyle: "normal",
        textAlign: "left",
        marginTop: 2,
    },


    profile_logout_btn_view: {
        backgroundColor: "rgba(0, 161, 222, 1)",
        width: wp('25%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20
    },
    profile_logout_btn_text: {
        opacity: 1,
        position: "relative",
        backgroundColor: "rgba(255, 255, 255, 0)",
        color: "rgba(255, 255, 255, 1)",
        fontSize: 13,
        fontStyle: "normal",

    },
});


export default DashboardUserinfo;