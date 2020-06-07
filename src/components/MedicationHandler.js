import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList, Dimensions  } from 'react-native';
import Colors from '../constants/Colors'

const MedicationHandler = props => (

    <View style={styles.listItems}>
        <View style={[styles.circleColumn, props.styles || {}]} >
            <Text numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.circleColumnItemsDate}>{props.medDate}</Text>
            <Text style={styles.circleColumnItemsMonth}>{props.medMonth}</Text>
        </View>
        {/* <View style={styles.medicationTitle}>
            <Text style={styles.medDateStyle}>{props.medicationDate}</Text>
        </View> */}
        <View>
            <Text style={styles.medDetailFonts}>{props.medicationDetails}</Text>
        </View>

        <TouchableOpacity>
            <View style={[styles.circleColumnNFZ, props.styles || {}]} >
                <Text style={{ color: '#fff' }}>NFZ</Text>
            </View>
        </TouchableOpacity>

    </View>

);

const styles = StyleSheet.create({
    listItems: {
        flexDirection: 'row',
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#D1D1D6',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 8,
        paddingLeft: 0
    },
    medicationTitle: {
        backgroundColor: Colors.medicationDateColor,
        width: '50%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    medDateStyle: {
        color: '#fff',
        fontWeight: 'bold'
    },
    medDetailFonts: {
        color: Colors.indiciFontColor,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 15,
        width: 200,
    },
    circleColumn: {
        width: 55,
        height: 65,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.highAllergy,
        marginLeft: 10
    },
    circleColumnItemsDate: {
        fontSize: 15,
        color: '#fff'
    },
    circleColumnItemsMonth: {
        fontSize: 15,
        color: '#fff'
    },

    circleColumnNFZ: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00A1DE',
    }
});



export default MedicationHandler;