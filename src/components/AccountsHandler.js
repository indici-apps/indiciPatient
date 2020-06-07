import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/Colors'

const AccountsHandler = props => (

    <View style={styles.listItems}>
        <View style={[styles.circleColumn, props.styles || {}]} >
            <Text style={styles.circleColumnItemsDate}>{props.invoice_date}</Text>
            <Text style={styles.circleColumnItemsMonth}>{props.invoice_month}</Text>
        </View>
        <View style={styles.detailsView}>
            <View style={styles.detailsViewList}>
                <Text style={styles.algTile}>{props.payename}</Text>
                <Text style={styles.secondryFontStyle}>{props.paitent_name}</Text>
            </View>
        </View>

        <View style={styles.detailsViewPayment}>
            <View style={styles.detailsViewListPayment}>
                <Text style={styles.algTile}>{props.ammount}</Text>
                <Text style={styles.secondryFontStyle}>{props.balance}</Text>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    listItems: {
        flexDirection: 'row',
        marginTop: 0,
        borderWidth: 1,
        borderColor: '#D1D1D6',
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 0
    },
    circleColumn: {
        width: 55,
        height: 65,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F44336',
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
    detailsView: {
        flex: 2,
        marginLeft: 10,
        marginRight: 10,
    },
    detailsViewPayment: {

        marginRight: 10
    },
    detailsViewList: {
        flexDirection: 'column',
    },
    detailsViewListPayment: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    algTile: {
        fontSize: 16,
      
    },
    algOptions: {
        fontWeight: 'bold',
        fontSize: 16,

    },
    secondryFontStyle: {
        color: Colors.lightTextColor
    }
});



export default AccountsHandler;