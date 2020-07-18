import React, { useCallback, useEffect, useState } from 'react';
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

import { fetchSentMessageFromApi, fetchSentMoreMessageFromApi } from "../../../shared/actions/SentMessageActions";

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

const SentMessage = props => {
    const { SentItems, isGetting } = props.SentItems;
    const [isReady, setIsReady] = React.useState(false);    //state for check loading time

    const [sentMessageLbl, setsentMessageLbl] = useState('Searching for new messages');
    useFocusEffect(
        useCallback(() => {
            //alert('Long Terms is Focused Now');
            props.getsSentMessage();
        }, [])
    );


    useFocusEffect(
        useCallback(() => {
            const restoreState = async () => {
                try {
                    props.getsSentMessage();
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

                typeof (SentItems) !== 'undefined' && SentItems.length ? (
                    <FlatList
                        style={{ marginTop: 0 }}
                        data={SentItems}
                        renderItem={({ item }) => (
                            <MessaginHandler
                                styles={getRandomColor()}
                                initails={getInitials(item.resource.extension[3].valueString)}
                                senderName={item.resource.extension[3].valueString}
                                sentDate={GetAppointmentDate(item.resource.extension[4].valueDateTime) + ' ' + GetMonthName(item.resource.extension[4].valueDateTime)}
                                subject={item.resource.note[0].text}
                                msgtext={item.resource.extension[0].valueString}
                            />
                        )}
                        keyExtractor={item => item.resource.id}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={7}
                        onEndReachedThreshold={1}
                        onEndReached={() => {
                            pageNumber = pageNumber + 1;
                            console.log('Page is on end : ' + pageNumber)
                            props.getsSentMessageMoreSuccess(pageSize, pageNumber)
                            //props.getPeople(pageSize, pageNumber, diagType);
                        }}
                    />
                ) : < View style={{ textAlign: 'center', marginTop: 5 }}>
                        <Text> {sentMessageLbl}</Text>
                    </View>


            }

        </View >
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
        SentItems: state.SentItems
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getsSentMessage: () => dispatch(fetchSentMessageFromApi(pageSize, pageNumber)),
        getsSentMessageMoreSuccess: () => dispatch(fetchSentMoreMessageFromApi(pageSize, pageNumber))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SentMessage)
//export default ReceivedMessage;
