import React, { useCallback } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";
import MessaginHandler from '../../components/MessaginHandler';
import { GetAppointmentDate, GetMonthName, GetYear } from '../../../shared/core/datehelper'

import { fetchMessageFromApi } from "../../../shared/actions/MessagingActions";

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return { backgroundColor: color }
}

const getInitials = string => {
    return string
        .split('')
        .map(([firstLetter]) => firstLetter)
        .filter((_, index, array) => index === 0 || index === array.length - 1)
        .join('')
        .toUpperCase();
}


let pageNumber = 1;
let pageSize = 20;

function ChecInboxMessages(props) {
    const results = props.results;
    if (results.resource.extension[1].valueString === 'Send Mail') {
        return <MessaginHandler
            styles={getRandomColor()}
            initails={getInitials(results.resource.extension[2].valueString)}
            senderName={results.resource.extension[3].valueString}
            sentDate={GetAppointmentDate(results.resource.extension[4].valueDateTime) + ' ' + GetMonthName(results.resource.extension[4].valueDateTime)}
            subject={results.resource.note[0].text}
        />
    }
    else {
        return null
    }
}

const Drafts = props => {
    const { Messaging, isGetting } = props.Messaging;
    useFocusEffect(
        useCallback(() => {
            //alert('Long Terms is Focused Now');
            //props.getMessage();
        }, [])
    );
    return (
        <View style={styles.screenContainer}>
            {/* <MessaginHandler
                styles={getRandomColor()}
                initails={getInitials('Tania TANIA')}
                senderName={'Tania TANIA'}
                sentDate={'20 May 2020'}
                subject={'Repeat RX Request Rejected'}
            /> */}
            {
                isGetting && <View style={{ textAlign: 'center', marginTop: 5 }}><ActivityIndicator size="small" color="#00A1DE" /></View>
            }
            {
                <FlatList
                    style={{ marginTop: 10 }}
                    data={Messaging}
                    renderItem={({ item }) => (
                        <ChecInboxMessages results={item} />
                    )}
                    keyExtractor={item => item.resource.id}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                    }}
                />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",

    },
});

function mapStateToProps(state) {
    return {
        Messaging: state.Messaging
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMessage: () => dispatch(fetchMessageFromApi(pageSize, pageNumber))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Drafts)
//export default ReceivedMessage;
