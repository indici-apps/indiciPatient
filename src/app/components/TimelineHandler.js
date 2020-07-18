import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList, Platform, PixelRatio } from 'react-native';
import Colors from '../../shared/constants/Colors'
import { Normaize } from "../../shared/core/Normaize";

var FONT_BACK_LABEL   = 18;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 14;
}


const TimelineHander = props => (

    <View style={styles.listItems}>
        <View style={{ flexDirection: 'row'}}>
           
            {/* <View style={[styles.circleColumn, props.styles || {}]} >
                <Text style={styles.circleColumnItemsDate}>{props.tmDate}</Text>
                <Text style={styles.circleColumnItemsMonth}>{props.tmMonth}</Text>
            </View> */}


            <View style={styles.docProfile}>
                <Image style={{ width: 40, height: 40, borderRadius: 5 }} source={require('../../assets/face.png')} />
                <View style={styles.docInfo}>
                    <Text style={{fontSize: Platform.OS === 'web' ? 14 :   Normaize(14)}}>{props.doctor_name}</Text>
                    <Text style={styles.timeView}>{props.time}</Text>
                </View>
            </View>


        </View>


        <View style={styles.timeLineDetails}>
            <Text style={styles.textDetails}>{props.doctor_comment}</Text>
        </View>
    </View>

);

const styles = StyleSheet.create({
    listItems: {
        flexDirection: 'column',
        marginTop: 5,
        borderWidth: 0,
        borderColor: '#D1D1D6',
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
    },
    docProfile: {
        flexDirection: 'row',
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    docInfo: {
        marginLeft: 5,
    },
    timeView: {
        color: Colors.lightTextColor,
    },
    timeLineDetails: {
        marginLeft: 22,
        marginTop: 10,
        marginRight: 22,

    },
    textDetails: {
        textAlign: 'justify',
        color: Colors.textColor,
        fontSize: Platform.OS === 'web' ? 15 :   Normaize(15),
    },
    circleColumn: {
        width: 55,
        height: 65,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lowAllergy,
        marginLeft: 22
    },
    circleColumnItemsDate: {
        fontSize: Platform.OS === 'web' ? 14 :   Normaize(13),
        color: '#fff'
    },
    circleColumnItemsMonth: {
        fontSize: Platform.OS === 'web' ? 14 :   Normaize(14),
        color: '#fff',
        top: 3
    },
});



export default TimelineHander;