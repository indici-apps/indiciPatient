import React, { useState, useEffect } from 'react';
import {
    Platform,
    StyleSheet,
    Text, View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Svg, { Defs, Pattern, LinearGradient, Stop } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { } from 'react-native-svg';

import Colors from '../../../shared/constants/Colors';
import AccountsHandler from '../../components/AccountsHandler';
import { GetAppointmentDate, GetMonthName, GetYear } from '../../../shared/core/datehelper';
import * as WebBroswer from 'expo-web-browser';

function GetTagColor(invoiceType) {
    if (invoiceType === 'unpaid') {
        return { backgroundColor: Colors.highAllergy }
    }
    if (invoiceType === 'paid') {
        return { backgroundColor: Colors.lowAllergy }
    }
}


//const cost = DATA.reduce((a, { id, invoice_ammount }) => (a[id] = (a[id] || 0) + +invoice_ammount, a), {});


const getCurrentDate = () => {

    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let currentDate = d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear();
    return currentDate;
}
// let summedAmmount = DATA.reduce((a, c) => {
//     let filtered = a.filter(el => el.id === c.id);
//     if (filtered.length > 0) {
//         a[a.indexOf(filtered[0])].invoice_ammount += +c.invoice_ammount;
//     } else {
//         a.push(c);
//     }
//     return a;
// }, []);
const AllInvoices = props => {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.paymentsPanel}>
                <View style={styles.paymentsPanelHeader}>
                    <View>
                        <Svg height={40} width={40} fill="#007AFF" fillRule="nonzero" viewBox="0 0 512 512" {...props}>
                            <SvgPath d="M488 359.88c-2.212 0-4 1.792-4 4v111.76c0 15.572-12.564 28.24-28 28.24H36c-15.436 0-28-12.668-28-28.24V159.88c0-2.208-1.788-4-4-4s-4 1.792-4 4v315.76c0 19.984 16.148 36.24 36 36.24h420c19.852 0 36-16.256 36-36.24V363.88c0-2.208-1.788-4-4-4zM456 123.88H36c-2.212 0-4 1.792-4 4s1.788 4 4 4h420c15.436 0 28 12.452 28 27.76v108.24c0 2.208 1.788 4 4 4 2.212 0 4-1.792 4-4V159.64c0-19.72-16.148-35.76-36-35.76z" />
                            <SvgPath d="M456 103.88H36c-2.212 0-4 1.792-4 4s1.788 4 4 4h420c15.436 0 28 12.452 28 27.76v108.24c0 2.208 1.788 4 4 4 2.212 0 4-1.792 4-4V139.64c0-19.72-16.148-35.76-36-35.76zM36 123.64c-15.436 0-28-12.56-28-28 0-2.208-1.788-4-4-4s-4 1.792-4 4c0 19.848 16.148 36 36 36 2.212 0 4-1.792 4-4s-1.788-4-4-4zM36 171.64c-15.436 0-28-12.56-28-28 0-2.208-1.788-4-4-4s-4 1.792-4 4c0 19.848 16.148 36 36 36 2.212 0 4-1.792 4-4s-1.788-4-4-4z" />
                            <SvgPath d="M429.988 58.6c-2.016-.864-4.38.084-5.244 2.116a3.995 3.995 0 002.116 5.248C437.268 70.388 444 80.468 444 91.64v12.24c0 2.208 1.788 4 4 4 2.212 0 4-1.792 4.004-4V91.64c0-14.392-8.64-27.36-22.016-33.04zM180 55.88H36c-19.852 0-36 16.04-36 35.76v316.24c0 2.208 1.788 4 4 4s4-1.792 4-4V91.64c0-15.308 12.564-27.76 28-27.76h144c2.212 0 4-1.792 4-4s-1.788-4-4-4z" />
                            <SvgPath d="M451.724 107.16c-1.288-10.236-6.964-19.464-15.576-25.312a4.004 4.004 0 00-5.556 1.06 4 4 0 001.064 5.556c6.708 4.556 11.128 11.732 12.128 19.688a4 4 0 003.964 3.5c.164 0 .332-.012.508-.024a3.999 3.999 0 003.468-4.468zM92 75.88H36c-2.212 0-4 1.792-4 4s1.788 4 4 4h56c2.212 0 4-1.792 4-4s-1.788-4-4-4zM492 263.88H340c-11.028 0-20 8.972-20 20v64c0 11.028 8.972 20 20 20h152c11.028 0 20-8.972 20-20v-64c0-11.028-8.972-20-20-20zm12 84c0 6.616-5.384 12-12 12H340c-6.616 0-12-5.384-12-12v-64c0-6.616 5.384-12 12-12h152c6.616 0 12 5.384 12 12v64z" />
                            <SvgPath d="M372 283.64c-17.644 0-32 14.356-32 32s14.356 32 32 32 32-14.356 32-32-14.356-32-32-32zm0 56c-13.236 0-24-10.764-24-24s10.764-24 24-24 24 10.764 24 24-10.764 24-24 24z" />
                            <SvgPath d="M384 311.64c-2.212 0-4 1.792-4 4 0 4.412-3.588 8-8 8s-8-3.588-8-8 3.588-8 8-8c2.212 0 4-1.792 4-4s-1.788-4-4-4c-8.824 0-16 7.176-16 16s7.176 16 16 16 16-7.176 16-16c0-2.208-1.788-4-4-4zM440 359.88c-2.212 0-4 1.792-4 4v87.764c0 2.256-1.868 4.236-4 4.236H36c-15.436 0-28-12.56-28-28 0-2.208-1.788-4-4-4s-4 1.792-4 4c0 19.848 16.148 36 36 36h396c6.504 0 12-5.604 12-12.236V363.88c0-2.208-1.788-4-4-4zM432 171.88H36c-2.212 0-4 1.792-4 4s1.788 4 4 4h396c2.244 0 4 1.652 4 3.764v60.236c0 2.208 1.788 4 4 4 2.212 0 4-1.792 4-4v-60.236c0-6.596-5.268-11.764-12-11.764zM38 103.644c-5.516 0-10-4.488-10-10s4.484-10 10-10c2.212 0 4-1.792 4-4s-1.788-4-4-4c-9.924 0-18 8.076-18 18s8.076 18 18 18c2.212 0 4-1.792 4-4s-1.788-4-4-4z" />
                            <SvgPath d="M443.032 106.728L418.788 3.208A4.003 4.003 0 00417.004.72a4.018 4.018 0 00-3.024-.496L24.576 91.744a4.004 4.004 0 00-2.98 4.812 4.017 4.017 0 004.808 2.98L411.908 8.932l23.328 99.62a4.005 4.005 0 004.812 2.984 4 4 0 002.984-4.808z" />
                            <SvgPath d="M409.912 106.74l-7.7-32.884a3.977 3.977 0 00-1.784-2.488 4.012 4.012 0 00-3.02-.496c-15.624 3.652-31.272-6.068-34.924-21.672a3.977 3.977 0 00-1.784-2.488 4.01 4.01 0 00-3.024-.496l-245.62 57.528a4.001 4.001 0 00-2.98 4.808 3.988 3.988 0 004.808 2.984l241.932-56.664c5.74 16.372 22.236 26.616 39.472 24.496l6.836 29.196a4.005 4.005 0 004.804 2.984 4 4 0 002.984-4.808z" />
                            <SvgPath d="M250.456 94.948c-14.772-11.776-31.316-16.288-46.572-12.712-12.452 2.92-23.24 10.948-31.192 23.216a3.996 3.996 0 001.18 5.532 3.973 3.973 0 002.172.644 4.011 4.011 0 003.364-1.828c6.808-10.5 15.904-17.34 26.308-19.776 12.804-3 26.94.96 39.756 11.176 1.72 1.384 4.24 1.092 5.62-.632a3.995 3.995 0 00-.636-5.62zM397.956 55.68l-3.28-14.012c-.504-2.152-2.66-3.496-4.804-2.984a4 4 0 00-2.984 4.808l3.28 14.012a4.005 4.005 0 004.804 2.984 4 4 0 002.984-4.808z" />
                            <SvgPath d="M394.672 41.676c-.5-2.152-2.66-3.496-4.804-2.984l-13.344 3.12a3.995 3.995 0 00-2.984 4.804 4.002 4.002 0 004.804 2.984l13.344-3.12a3.995 3.995 0 002.984-4.804z" />
                        </Svg>
                    </View>
                    <View style={styles.paymentsPanelHeaderBody}>
                        <Text style={styles.headerTitle}>Account Balance</Text>
                        <Text style={styles.headerBodyText}>Today, {getCurrentDate()} </Text>
                    </View>
                    <View style={styles.paymentsPanelBtn}>
                        <TouchableOpacity onPress={() => WebBroswer.openBrowserAsync('https://checkout.stripe.com/pay/ppage_1GlrYhFKnpzPB0MXtlF1PxgZ#fidkdWxOYHwnPyd1blpxYHZxWm9CPHY2XUhhVm9fQzxOYWgwYjA8f2lcYScpJ3dgY2B3d2B3SndsYmxrJz8nbXFxdXY%2FKip2cXdsdWArZmpoJyknaWpmZGlgJz9rcGlpKSdobGF2Jz9%2BJ2JwbGEnPydgMmQxNGM8NSg3ZDRmKDExMDEoPDJgNCg2NmE1YGQ3YTZnNmMnKSdocGxhJz8nYGMyMTA0PDUoYDBmZygxNmA8KGdmNDQoMDRmNTc3MmRmZ2dhJykndmxhJz8nZ2M0MTwxMWcoNjJjMygxMzBhKGQ1NGAoN2AzMjUxYGBnMzYyJ3gpJ2dgcWR2Jz9eWHgl')}>
                            <View style={styles.paymentsPanelBtnBg}>
                                <Image style={styles.imageBtn} source={require('../../../assets/pay_now.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>

                <View style={styles.moneyRow}>
                    <Text style={styles.dolloarSymbol}>$</Text>
                    <Text style={styles.price}>359</Text>
                    <View style={{ marginTop: 5 }}>
                        <Text style={styles.dollarUSD}>USD</Text>
                        <Text style={styles.pointPrice}>.96</Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 30 }}>
                        <View style={{ flexDirection: 'row', width: 50 }}>
                            <View style={{ height: 20, width: 20, backgroundColor: Colors.highAllergy }}></View>
                            <Text style={{ marginLeft: 5 }}>Unpaid</Text>
                        </View>

                        <View style={{ flexDirection: 'row', width: 50, marginTop: 5 }}>
                            <View style={{ height: 20, width: 20, backgroundColor: Colors.lowAllergy }}></View>
                            <Text style={{ marginLeft: 5 }}>Paid</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.currentBalStyle}>is your current balance</Text>
            </View>

            {/* <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <AccountsHandler
                        styles={GetTagColor(item.invoice_type)}
                        invoice_date={GetAppointmentDate(item.invoice_date) + ' ' + GetMonthName(item.invoice_date)}
                        invoice_month={GetYear(item.invoice_date)}
                        payename={item.invoice_pay}
                        paitent_name={item.patient_name}
                        ammount={'Ammount: $' + item.invoice_ammount}
                        balance={'Balance: $' + item.invoice_ammount}

                    />
                )}
                keyExtractor={item => item.id}
            /> */}
        </View>
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",

    },
    paymentsPanel: {
        flexDirection: 'column',
        marginTop: 5,
        borderWidth: 0,
        borderColor: '#D1D1D6',
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,

    },

    paymentsPanelHeader: {
        flexDirection: 'row',
        marginLeft: 10,

    },

    paymentsPanelHeaderBody: {
        marginLeft: 10,
        justifyContent: 'center',

    },
    headerTitle: {
        color: "rgba(0, 122, 255, 1)",
        fontSize: 18,
        fontStyle: "normal",
    },
    headerBodyText: {
        color: Colors.lightTextColor
    },

    paymentsPanelBtn: {
        marginLeft: 10
    },
    paymentsPanelBtnBg: {
        backgroundColor: '#00A1DE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 20
    },

    paybtnText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff',
        fontSize: 16
    },
    imageBtn: {
        width: 120,
        height: 35,
    },

    moneyRow: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10
    },

    dolloarSymbol: {
        fontSize: 20,
        color: Colors.lightTextColor,
        marginTop: 13,
    },

    price: {
        fontSize: 36,
        fontWeight: "100",
        fontStyle: "normal",
    },

    dollarUSD: {
        fontSize: 12,
        color: Colors.lightTextColor,
    },

    pointPrice: {
        fontSize: 14,
        color: Colors.lightTextColor,
    },
    currentBalStyle: {
        color: Colors.lightTextColor,
        marginLeft: 25,
        marginTop: -10
    },
});
export default AllInvoices;