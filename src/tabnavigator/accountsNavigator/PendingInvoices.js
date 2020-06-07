import React, { useState, useEffect } from 'react';
import {
    Platform,
    StyleSheet,
    Text, View,
    Button,
    TextInput,
    Image,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
    FlatList
} from 'react-native';

import Colors from '../../constants/Colors';
import AccountsHandler from '../../components/AccountsHandler';
import { GetDayName, GetAppointmentDate, GetMonthName, ReturnTypeIcon , GetYear} from '../../core/datehelper'
const DATA = [{
    "id": "17f8c39e198336b32f4fe2ff509f329d97b85446c0fe9647497043b0f3bd0919",
    "invoice_type": "unpaid",
    "invoice_date": "3/18/2020",
    "invoice_pay": "Dr. Alpha Beta",
    "patient_name": "Self",
    "invoice_ammount": 28
}, {
    "id": "36335885e7385614b20d29231355c6bac89cdbdcf8a5b5ba540a99567a77ebda",
    "invoice_type": "unpaid",
    "invoice_date": "2/24/2020",
    "invoice_pay": "Dr. Alpha Beta",
    "patient_name": "Gill Butler",
    "invoice_ammount": 108
}, {
    "id": "3a430810961539092a2a26d28a7e867218a48150e7064e53bbc6aba9730e5a31",
    "invoice_type": "unpaid",
    "invoice_date": "4/16/2020",
    "invoice_pay": "Dr. Alpha Beta",
    "patient_name": "Gill Butler",
    "invoice_ammount": 113
}, {
    "id": "df3d29e036e9d884902fa24913bf17c4824b2aa7226a6fb4ab0b4bbddac5cf32",
    "invoice_type": "unpaid",
    "invoice_date": "3/3/2020",
    "invoice_pay": "Dr. Alpha Beta",
    "patient_name": "Gill Butler",
    "invoice_ammount": 136
}, {
    "id": "86c94e4f7693c6b3f51c6664dd5775d313ed4d016d37048e7a4eada8ad101de9",
    "invoice_type": "unpaid",
    "invoice_date": "5/16/2020",
    "invoice_pay": "Dr. Alpha Beta",
    "patient_name": "Gill Butler",
    "invoice_ammount": 106
}, {
    "id": "7383bf0c34b70d76c1d184111937a86f70d7ec9ef9184b0abe826b31856b77a9",
    "invoice_type": "unpaid",
    "invoice_date": "2/2/2020",
    "invoice_pay": "Dr. Alpha Beta",
    "patient_name": "Gill Butler",
    "invoice_ammount": 124
}, {
    "id": "a5cfc228a659023692d6f759ac082a0cea09f5159f7974345128cce8e1ce463c",
    "invoice_type": "unpaid",
    "invoice_date": "3/5/2020",
    "invoice_pay": "Dr. Alpha Beta",
    "patient_name": "Gill Butler",
    "invoice_ammount": 137
}, {
    "id": "3394ded8e60395ea0ec81549456b6e2edeee9bed476412e6ccd026c379c2c837",
    "invoice_type": "unpaid",
    "invoice_date": "2/4/2020",
    "invoice_pay": "Dr. Alpha Beta",
    "patient_name": "Gill Butler",
    "invoice_ammount": 145
}];
const PendingInvoices = props => {
    return (
        <View style={styles.screenContainer}>
            {/* <AccountsHandler /> */}
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <AccountsHandler
                        invoice_date={GetAppointmentDate(item.invoice_date)+' '+GetMonthName(item.invoice_date)}
                        invoice_month={GetYear(item.invoice_date)}
                        payename={item.invoice_pay}
                        paitent_name={item.patient_name}
                        ammount={'Ammount: $' + item.invoice_ammount}
                        balance={'Balance: $' + item.invoice_ammount}

                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",

    },

});
export default PendingInvoices;