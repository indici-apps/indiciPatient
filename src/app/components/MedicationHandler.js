import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../../shared/constants/Colors'
import { Normaize } from "../../shared/core/Normaize";


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
        <View style={{ marginLeft: 5 }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={styles.medDetailHedingFonts}>{props.medicationDetails}</Text>
                <TouchableOpacity>
                    <View style={[styles.circleColumnNFZ, props.styles || {}]} >
                        <Text style={{ color: '#fff', fontSize: Normaize(12) }}>NFZ</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{width: '88%'}}>
                <Text style={styles.medDetailTitleFonts}>Directions: <Text style={styles.medDetailFonts}>{props.directions}</Text></Text>
                <Text style={styles.medDetailTitleFonts}>Period: <Text style={styles.medDetailFonts}>{props.checking}</Text></Text>
                <Text style={styles.medDetailTitleFonts}>Quantity: <Text style={styles.medDetailFonts}>{props.quantity}</Text></Text>

                <Text style={styles.medDetailTitleFonts}>Prescribed By: <Text style={styles.medDetailFonts}>{props.presby}</Text></Text>
                <Text style={styles.medDetailTitleFonts}>Practice Name: <Text style={styles.medDetailFonts}>{props.pratname}</Text></Text>
            </View>
        </View>
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
        marginTop: 2,
        marginLeft: 10,
        marginRight: 15,
        width: '100%',
        fontSize: Normaize(14)
    },
    medDetailHedingFonts: {
        marginTop: 5,
        marginRight: 15,
        width: '70%',
        fontSize: Normaize(15)
    },
    medDetailTitleFonts: {
        color: '#00A1DE',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 15,
        fontSize: Normaize(14)
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
        fontSize: Normaize(14),
        color: '#fff'
    },
    circleColumnItemsMonth: {
        fontSize: Normaize(14),
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