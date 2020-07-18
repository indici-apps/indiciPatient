import React from 'react';
import { StyleSheet, Text, View, Image, PixelRatio } from 'react-native';
import Colors from '../../shared/constants/Colors'
import { Normaize } from "../../shared/core/Normaize";

var FONT_BACK_LABEL = 18;

if (PixelRatio.get() <= 2) {
    FONT_BACK_LABEL = 14;
}


const BookingAppHandler = props => (

    <View style={styles.listItems}>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ marginLeft: 10 }}>
                    <Image style={{ width: 60, height: 60, borderRadius: 40 }} source={require('../../assets/doc_image.jpg')} />
                </View>

                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.drName}>{props.dcprovidername}</Text>
                    <Text style={styles.drAppType}>{props.dcprovidertype}</Text>
                </View>
            </View>
        </View>

        <View style={{ width: '100%', marginTop: 10, borderTopWidth: 1, borderTopColor: '#DDDDDD' }}>
        </View>
        <View style={styles.timeLineDetails}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                <View>
                    <Text style={styles.textDetails}>Date and Time</Text>
                    <Text style={styles.textDetailsInner}>{props.datetimeofapp}</Text>
                </View>

                <View>
                    <Text style={styles.textDetails}>Duration</Text>
                    <Text style={styles.textDetailsInner}>{props.duration}</Text>
                </View>

            </View>
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
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    textDetails: {
        textAlign: 'justify',
        color: '#95989A',
        fontSize: Normaize(15),
    },
    textDetailsInner: {
        textAlign: 'justify',
        color: '#333333',
        fontSize: Normaize(14),
    },
    circleColumn: {
        width: 70,
        height: 70,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lowAllergy,
        marginLeft: 10
    },
    circleColumnItemsDate: {
        fontSize: Normaize(13),
        color: '#fff'
    },
    circleColumnItemsMonth: {
        fontSize: Normaize(14),
        color: '#fff',
        top: 3
    },
    drName: {
        fontSize: Normaize(16)
    },
    drAppType: {
        fontSize: Normaize(14),
        color: '#656565'
    }
});



export default BookingAppHandler;