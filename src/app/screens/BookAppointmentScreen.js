import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Platform, ActivityIndicator, Modal, TextInput } from 'react-native';
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { fetchTestAllergy, clenupbooking } from '../../shared/actions/BookAppActions'  
import { addPaitentAppoinmenttoAPI, clenuplatData } from '../../shared/actions/AddApointmentActions';
import { GetAppointmentDate, GetMonthName, GetYear } from  '../../shared/core/datehelper';
import { Normaize } from   '../../shared/core/Normaize';

import BookingAppHandler from "../components/BookingAppHandler";
import Colors from '../../shared/constants/Colors';


const BookAppointmentScreen = props => {

    //getting the data from api config
    const { BookApp, isBooking } = props.BookApp;
    const { AddAppointment, isAdding, isAvailable } = props.AddAppointment;

    //use to clean up state
    useFocusEffect(
        useCallback(() => {
            return props.getAppCleanUp();
        }, [])
    );


    const [date, setiDate] = useState(new Date());  //date settings
    const [def, setDef] = useState('Select date to view available slots');  //setting date of the select button
    const [mode, setMode] = useState('date'); //show and hide mode for the picker
    const [show, setShow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); //show hide modal
    const [slotId, setSlotId] = useState('');
    const [appointTime, setAppointTime] = useState('');
    const [durationAppoint, setdurationAppoint] = useState('');
    let textValue = '';

    //when user date selection changes
    const onChange = (event, selectedDate) => {

        //console.log('On Changed working...');
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setiDate(currentDate);
        setDef(GetAppointmentDate(currentDate) + ' ' + GetMonthName(currentDate) + ' ' + GetYear(currentDate));


        if (Platform.OS === 'android') {
            // console.log("Before: " +)
            setDef(GetAppointmentDate(currentDate) + ' ' + GetMonthName(currentDate) + ' ' + GetYear(currentDate));
            //console.log("After: " + def)
            props.getApp(GetAppointmentDate(currentDate) + ' ' + GetMonthName(currentDate) + ' ' + GetYear(currentDate));
        }
        else if (Platform.OS === 'ios') {
            setDef(GetAppointmentDate(currentDate) + ' ' + GetMonthName(currentDate) + ' ' + GetYear(currentDate));
            //console.log("iPhone is clled")
        }
    };

    //setting the show mode
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    //show the date picker
    const showDatepicker = () => {
        const currentDate = date;
        setDef(GetAppointmentDate(currentDate) + ' ' + GetMonthName(currentDate) + ' ' + GetYear(currentDate));
        showMode('date');
    };

    //show time picker
    const showTimepicker = () => {
        showMode('time');
    };

    //when done button is pressed after date is selected
    const close = (event, selectedDate) => {
        //const currentDate = selectedDate || date;
        //setDef(GetAppointmentDate(currentDate) + ' ' + GetMonthName(currentDate) + ' ' + GetYear(currentDate));
        setShow(false);
        //console.log("Date on Close : " + def)
        props.getApp(def);
    };

    function actionOnRow(item) {
        console.log('Selected Item :', item.resource.extension[0].valueString);
        setSlotId(item.resource.extension[0].valueString);
        setAppointTime(formatAMPM(item.resource.start));
        setdurationAppoint(item.resource.extension[3].valueDecimal + ' ' + item.resource.extension[4].valueString);
        
        //formatAMPM(item.resource.start)
        setModalVisible(true);
    }

    function fomraatedDate(currentDate) {
        let date = new Date(currentDate);
        let weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dateString = weekdayNames[date.getDay()] + " " + date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()

        return dateString;
    }

    function formatAMPM(currentDate) {
        let date = new Date(currentDate);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    const setDate = (event, date) => {
        if (date === undefined) {
            // dismissedAction
        }
    };

    const callforPaitent = () => {
        props.addAppoint(slotId);
    }

    const cancelModel = () => {
        props.addAppointClean();
        setModalVisible(!modalVisible);
    }

    const appointBookSuccess = () => {
        props.addAppointClean();
        setModalVisible(!modalVisible);
        props.navigation.navigate('Appnav')
    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.btnbg}>
                <TouchableOpacity onPress={showDatepicker}>
                    <View style={styles.btnStyle}>
                        <Text style={styles.btnViewStyle}>{def}</Text>
                    </View>
                </TouchableOpacity>

            </View>
            {show && (
                <View>
                    <DateTimePicker
                        minimumDate={new Date()}
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="calendar"
                        onChange={onChange}
                    />
                    <Button onPress={close} title="Done" />
                </View>
            )}

            {
                isBooking && <View style={{ textAlign: 'center', marginTop: 5 }}><ActivityIndicator size="small" color="#00A1DE" /></View>
            }
            {
                typeof (BookApp) !== 'undefined' && BookApp.length ? (
                    <FlatList
                        data={BookApp}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => actionOnRow(item)}>

                                <BookingAppHandler
                                    dcprovidername={item.resource.extension[1].valueString}
                                    dcprovidertype={item.resource.extension[2].valueString}
                                    //datetimeofapp={GetAppointmentDate(item.resource.start) + ' ' + GetMonthName(item.resource.start) + ' ' + GetYear(item.resource.start) + ' - ' + new Date(item.resource.start).toLocaleTimeString()}
                                    datetimeofapp={fomraatedDate(item.resource.start) + ' ' + formatAMPM(item.resource.start)}
                                    duration={item.resource.extension[3].valueDecimal + ' ' + item.resource.extension[4].valueString}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.resource.id}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => {
                        }}
                    />
                ) : <View style={styles.btnbg}>
                        <View style={styles.msgStyle}>
                            <Text style={styles.msgTextStyle}>No Solts available for selected Date..!!</Text>
                        </View>
                    </View>
            }


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Appointment ID: {slotId}</Text>
                        <Text style={styles.modalText}>Date: {def}</Text>
                        <Text style={styles.modalText}>Time: {appointTime}</Text>
                        <Text style={styles.modalText}>Duration: {durationAppoint}</Text>
                        <Text style={styles.modalText}>Reason for Appointment:</Text>
                        <TextInput
                            style={styles.input}
                            multiline={true}

                        />

                        {
                            isAdding && <View style={styles.laoderText}><ActivityIndicator size="small" color="#00A1DE" /></View>
                        }
                        {
                            isAvailable && typeof (AddAppointment) !== 'undefined' && AddAppointment.length ? (
                                //console.log(AddAppointment)
                                //alert(AddAppointment)

                                Alert.alert(

                                    "Appoinment Status",
                                    AddAppointment,
                                    [
                                        { text: "OK", onPress: () => appointBookSuccess() }
                                    ],
                                    { cancelable: false }
                                )


                            ) : null
                        }
                        {
                            !isAvailable && typeof (AddAppointment) !== 'undefined' && AddAppointment.length ? (
                                //console.log(AddAppointment)
                                //alert(AddAppointment)

                                Alert.alert(

                                    "Appoinment Status",
                                    AddAppointment + "\nDo you want to book another appointment?",
                                    [
                                        {
                                            text: "No",
                                            onPress: () => appointBookSuccess(),
                                            style: "cancel"
                                        },
                                        { text: "Yes", onPress: () => cancelModel() }
                                    ],
                                    { cancelable: false }
                                )

                            ) : null
                        }
                        {/* {
                            typeof (AddAppointment) !== 'undefined' && AddAppointment.length ? (
                                //console.log(AddAppointment)
                                //alert(AddAppointment)
                                
                                Alert.alert(
                                    
                                    "Appoinment Status",
                                    AddAppointment + "\nDo you want to book another appointment?",
                                    [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ],
                                    { cancelable: false }
                                )

                            ) : null
                        } */}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>

                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#2196F3", width: 100 }}
                                onPress={cancelModel}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#2196F3", marginLeft: 10, width: 100 }}
                                onPress={callforPaitent}
                            >
                                <Text style={styles.textStyle}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.defaultBackground,
    },
    btnbg: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnStyle: {
        backgroundColor: '#00A1DE',
        width: 250,
        height: 40,
        marginTop: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnViewStyle: {
        color: '#fff',
        fontSize: Normaize(14)
    },

    msgTextStyle: {
        color: '#000',
        fontSize: Normaize(15)
    },

    msgStyle: {
        width: 300,
        height: 40,
        marginTop: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.7)'

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    // centeredView: {
    //     flex: 1,
    //     justifyContent: "flex-end",
    //     alignItems: "center",
    //     marginTop: 0,
    //     width: '100%',
    //     backgroundColor: 'rgba(0,0,0,0.7)'

    // },
    // modalView: {
    //     width: '100%',
    //     height: '70%',
    //     backgroundColor: "white",
    //     borderTopLeftRadius: 20,
    //     borderTopRightRadius: 20,
    //     padding: 10,
    //     alignItems: "center",
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 2
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 30,


    // },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
    },

    laoderText: {
        marginTop: 10,
    },
    input: {
        width: 250,
        opacity: 0.7,
        backgroundColor: "rgba(226, 230, 234, 1)",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "rgba(226, 230, 234, 1)",
        color: "#000",
        fontWeight: "600"

    },
});



/*

 const setDate = (event, date) => {
        if (date === undefined) {
            // dismissedAction
        }
    };AddAppointment
*/

const mapStateToProps = (state) => {
    return {
        BookApp: state.BookApp,
        AddAppointment: state.AddAppointment
    }
}
// function mapStateToProps(state) {
//     return {
//         BookApp: state.BookApp
//     }
// }


const mapDispatchToProps = (disptach, state) => {
    return {
        getApp: (def) => disptach(fetchTestAllergy(def)),
        getAppCleanUp: () => disptach(clenupbooking()),
        addAppoint: (slotId) => disptach(addPaitentAppoinmenttoAPI(slotId, 'Testing Live')),
        addAppointClean: () => disptach(clenuplatData()),
    }
}

// function mapDispatchToProps(disptach) {
//     return {
//         getApp: () => disptach(fetchTestAllergy(passingDate)),
//         getAppCleanUp: () => disptach(clenupbooking())
//     }
// }
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookAppointmentScreen)

//export default BookAppointmentScreen;
