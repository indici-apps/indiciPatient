import React, { memo, useCallback, useEffect, useState } from 'react';
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
    FlatList,
    ActivityIndicator
} from 'react-native';

//import Colors from '../../../constants/Colors';
import AccountsHandler from '../../components/AccountsHandler';
import { GetDayName, GetAppointmentDate, GetMonthName, ReturnTypeIcon, GetYear } from '../../../shared/core/datehelper'


import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";
import { fetchPendingInvoiceFromApi, fetchMorePendingInvoiceFromApi } from "../../../shared/actions/PendingInvoiceActions";



let pageNumber = 1;
const PendingInvoices = props => {

    const { PendingInvc, isGetting } = props.PendingInvc;
    const [pageSize, setPageSize] = useState(10);           //state for the page number
    const [isReady, setIsReady] = React.useState(false);    //state for check loading time


    useFocusEffect(
        useCallback(() => {
            const restoreState = async () => {
                try {
                    props.getPendingInvoice(pageSize, pageNumber)
                    // typeof (CancelledAppointments) !== 'undefined' && CancelledAppointments.length ? (
                    //     null
                    // ) : props.getCancelAppoint(pageSize, pageNumber)
                }
                finally {
                    setIsReady(true);
                }
            };
            if (!isReady) {
                restoreState();
            }
            return () => {
                // console.log('On Exit' + people.length)
            };
        }, [isReady])
    );

    if (!isReady) {
        return null;
    }


    return (
        <View style={styles.screenContainer}>

            {
                isGetting && <View style={{ textAlign: 'center', marginBottom: 5 }}><ActivityIndicator size="small" color="#00A1DE" /></View>
            }
            {
                typeof (PendingInvc) !== 'undefined' && PendingInvc.length ? (
                    <FlatList
                        data={PendingInvc}
                        renderItem={({ item }) => (
                            <AccountsHandler
                                invoice_date={GetAppointmentDate(item.resource.extension[0].valueDateTime) + ' ' + GetMonthName(item.resource.extension[0].valueDateTime)}
                                invoice_month={GetYear(item.resource.extension[0].valueDateTime)}
                                payename={item.resource.extension[4].valueString}
                                paitent_name={'Type: ' + item.resource.extension[2].valueString}
                                ammount={'Ammount: $' + item.resource.extension[6].valueString}
                                balance={'Balance: $' + item.resource.extension[7].valueString}

                            />
                        )}
                        keyExtractor={item => item.resource.id}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={7}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            pageNumber = pageNumber + 1;
                            console.log('Page is on end : ' + pageNumber)
                            props.getPendingInvoice(pageSize, pageNumber)
                            //props.getPeople(pageSize, pageNumber, diagType);
                        }}
                    />
                ) : null
            }

        </View>
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",

    },

});


function mapStateToProps(state) {
    return {
        PendingInvc: state.PendingInvc
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPendingInvoice: (pageSize, pageNumber) => dispatch(fetchPendingInvoiceFromApi(pageSize, pageNumber))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingInvoices)
//export default PendingInvoices;