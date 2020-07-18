import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Modal
} from 'react-native';
import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";
import MessaginHandler from '../../components/MessaginHandler';
import { GetAppointmentDate, GetMonthName, GetYear } from '../../../shared/core/datehelper'
import { Normaize } from "../../../shared/core/Normaize";
import { fetchMessageFromApi, fetchMoreMessageFromApi } from "../../../shared/actions/MessagingActions";
import { fetctRecpFromApi } from "../../../shared/actions/GetRecpActions";
import RecpHandler from "../../components/RecpHandler";




const getInitials = nameString => {
    const regexChar = /\D\w+/
    return nameString
        .trim() //remove trailing spaces
        .split(' ') // splits on spaces
        .filter(word => word.length > 0) // strip out double spaces
        .filter(word => regexChar.test(word)) // strip out special characters
        .map(word => word.substring(0, 1).toUpperCase()) // take first letter from each word and put into array
}

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return { backgroundColor: '#000' }
}



let pageNumber = 1;
let pageSize = 20;



const ReceivedMessage = props => {
    const { Messaging, isGetting } = props.Messaging;
    const { Recp, isSearching } = props.Recp;
    const [modalVisible, setModalVisible] = useState(false);
    const [isReady, setIsReady] = React.useState(false);    //state for check loading time


    // useFocusEffect(
    //     useCallback(() => {
    //         //alert('Long Terms is Focused Now');
    //         props.getMessage();
    //         props.getRecp();
    //     }, [])
    // );

    useFocusEffect(
        useCallback(() => {
            const restoreState = async () => {
                try {
                    typeof (Messaging) !== 'undefined' && Messaging.length ? (
                        null
                    ) : props.getMessage(),
                        props.getRecp();
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
                isGetting && <View style={{ textAlign: 'center', marginTop: 5 }}><ActivityIndicator size="small" color="#00A1DE" /></View>
            }
            {
                typeof (Messaging) !== 'undefined' && Messaging.length ? (
                    <FlatList
                        style={{ marginTop: 0 }}
                        data={Messaging}
                        renderItem={({ item }) => (
                            <MessaginHandler
                                styles={getRandomColor()}
                                initails={getInitials(item.resource.extension[2].valueString)}
                                senderName={item.resource.extension[2].valueString}
                                sentDate={GetAppointmentDate(item.resource.extension[4].valueDateTime) + ' ' + GetMonthName(item.resource.extension[4].valueDateTime)}
                                subject={item.resource.note[0].text}
                                msgtext={item.resource.extension[0].valueString}
                            />
                        )}
                        keyExtractor={item => item.resource.id}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={7}
                        onEndReachedThreshold={2}
                        onEndReached={() => {
                            pageNumber = pageNumber + 1;
                            props.getMessage(pageSize, pageNumber)

                        }}

                    />
                ) : null

            }

            <TouchableOpacity onPress={() => {
                setModalVisible(true);
            }} style={styles.fab}>
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                presentationStyle="overFullScreen"
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: 5, borderBottomWidth: 1, borderBottomColor: '#e8e8e8', flexDirection: 'row' }}>
                            <Text style={styles.modalText}>Select Receipent</Text>

                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '100%' }}>

                            {
                                isSearching && <View style={{ textAlign: 'center', marginTop: 5 }}><ActivityIndicator size="small" color="#00A1DE" /></View>
                            }
                            {
                                <FlatList
                                    style={{ marginTop: 10 }}
                                    data={Recp}
                                    renderItem={({ item }) => (
                                        <RecpHandler
                                            styles={getRandomColor()}
                                            reInitails={getInitials(item.resource.name[0].text)}
                                            reReceiverName={item.resource.name[0].text}
                                            reType={item.resource.extension[1].valueString}
                                        />
                                    )}
                                    keyExtractor={item => item.resource.id}
                                    onEndReachedThreshold={0.1}
                                    onEndReached={() => {
                                    }}
                                />
                            }



                        </View>


                    </View>
                </View>
            </Modal>




        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",

    },
    fab: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: Normaize(30),
        color: 'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)'

    },
    modalView: {
        width: '100%',
        height: '70%',
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 30,


    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 100
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        padding: 10,

        width: 200,
        fontSize: Normaize(16)
    }
});

function mapStateToProps(state) {
    return {
        Messaging: state.Messaging,
        Recp: state.Recp
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMessage: () => dispatch(fetchMessageFromApi(pageSize, pageNumber)),
        getMessageMoreSuccess: () => dispatch(fetchMoreMessageFromApi(pageSize, pageNumber)),
        getRecp: () => dispatch(fetctRecpFromApi(pageSize, pageNumber))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReceivedMessage)
//export default ReceivedMessage;
