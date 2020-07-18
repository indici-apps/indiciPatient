import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../shared/constants/Colors'
import { Normaize } from "../../shared/core/Normaize";


const MedicationWebHandler = props => {

    const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
    React.useEffect(() => {
        const onDimensionsChange = ({ window }) => {
            setDimensions(window);
        };
        Dimensions.addEventListener('change', onDimensionsChange);

        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    }, []);

    const isLargeScreen = dimensions.width >= 1024;


    return (
        <View style={[styles.listItems, { width: isLargeScreen ? '48%' : '92%' }]}>
            <View style={[styles.circleColumn, props.styles || {}]} >
                <Text numberOfLines={1}
                    adjustsFontSizeToFit
                    style={styles.circleColumnItemsDate}>{props.medDate}</Text>
                <Text style={styles.circleColumnItemsMonth}>{props.medMonth}</Text>
            </View>

            <View style={{ marginLeft: 5 }} >
                <Text style={{marginLeft: 10, flexWrap: 'wrap'}}>Medication Name goes here, this is a very good medication name</Text>
                <View>
                    <Text style={styles.medDetailTitleFonts}>Directions: <Text style={styles.medDetailFonts}>{props.directions}</Text></Text>
                    <Text style={styles.medDetailTitleFonts}>Period: <Text style={styles.medDetailFonts}>{props.checking}</Text></Text>
                    <Text style={styles.medDetailTitleFonts}>Quantity: <Text style={styles.medDetailFonts}>{props.quantity}</Text></Text>

                    <Text style={styles.medDetailTitleFonts}>Prescribed By: <Text style={styles.medDetailFonts}>{props.presby}</Text></Text>
                    <Text style={styles.medDetailTitleFonts}>Practice Name: <Text style={styles.medDetailFonts}>{props.pratname}</Text></Text>
                </View>
            </View>

            <View style={[styles.nfzColumn, props.styles || {}]} >
                <Text numberOfLines={1}
                    adjustsFontSizeToFit
                    style={styles.circleColumnItemsDate}>NFZ</Text>
            </View>
          
        </View>
    );
};







const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 346,
        height: 17
    },
    directions: {

        color: "#121212"
    },
    loremIpsum2: {

        color: '#00A1DE',
        fontSize: 14
    },

    listItems: {
        flexDirection: 'row',
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#D1D1D6',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,

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
        fontSize: 14
    },
    medDetailHedingFonts: {
        marginTop: 5,
        marginRight: 15,
        fontSize: 15
    },
    medDetailTitleFonts: {
        color: '#00A1DE',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 15,
        fontSize: 14
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

    nfzColumn: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00A1DE',
        marginLeft: 5
    },
    circleColumnItemsDate: {
        fontSize: 14,
        color: '#fff'
    },
    circleColumnItemsMonth: {
        fontSize: 14,
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



export default React.memo(MedicationWebHandler);