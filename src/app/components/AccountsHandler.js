import React from 'react';
import { StyleSheet, Text, View , Platform} from 'react-native';
import { Normaize } from "../../shared/core/Normaize";
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
        fontSize: Platform.OS === 'web' ? 13 : Normaize(13),
        color: '#fff'
    },
    circleColumnItemsMonth: {
        fontSize: Platform.OS === 'web' ? 13 : Normaize(13),
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
        fontSize: Platform.OS === 'web' ? 14 : Normaize(14),
        color: '#455E77',
    },
    algOptions: {
        fontWeight: 'bold',
        fontSize: 16,

    },
    secondryFontStyle: {
        color: '#70798F',
        fontSize: Platform.OS === 'web' ? 13 : Normaize(13),
        marginTop: 5
    }
});



export default AccountsHandler;