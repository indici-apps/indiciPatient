import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Normaize } from "../../shared/core/Normaize";



const RecpHandler = props => (

    <View style={styles.listItems}>
        <View style={[styles.circleColumn, props.styles || {}]} >
            <Text style={styles.circleColumnItemsDate}>{props.reInitails}</Text>
        </View>
        <View style={styles.detailsView}>
            <View style={styles.detailsViewList}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.algTile}>{props.reReceiverName}</Text>
                    <Text>{props.sentDate}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: Normaize(12) }}>{props.reType}</Text>
                </View>


            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    listItems: {
        flexDirection: 'row',
        marginTop: 5,
        borderBottomWidth: 1,
        borderColor: '#D1D1D6',
        width: '100%',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    circleColumn: {
        width: 45,
        height: 45,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E81F1F',
        marginLeft: 10
    },
    circleColumnItemsDate: {
        fontSize: Normaize(18),
        color: '#fff'
    },
    circleColumnItemsMonth: {
        fontSize: 15,
        color: '#fff'
    },
    detailsView: {
        flex: 2,
        marginLeft: 20,
        marginRight: 10,
    },
    detailsViewList: {
        flexDirection: 'column',
    },
    algTile: {
        fontSize: Normaize(14),
        fontWeight: "bold",
    },
    algOptions: {
        fontWeight: 'bold',
        fontSize: 16,

    }
});

export default RecpHandler;