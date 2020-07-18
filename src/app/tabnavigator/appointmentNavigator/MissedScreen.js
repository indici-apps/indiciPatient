import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Svg, { Defs, Pattern, LinearGradient, Stop } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { } from 'react-native-svg';
import { Image as SvgImage } from 'react-native-svg';
import AppointmentListHandler from '../../components/AppointmentListHandler';
import { GetDayName, GetAppointmentDate, GetMonthName, ReturnTypeIcon, GetYear } from '../../../shared/core/datehelper';

import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";
import { fetchmAppointmentsFromApi } from "../../../shared/actions/MissedAppointmentActions";
const DATA = [{
    "id": "37d2fb2fc10eb8bb071b026fabb3c9073aa15fb8111247cf0a0fcad677c36d52",
    "date": "3/21/2020",
    "doctor_name": "Kuí",
    "appointment_time": "2:49 AM",
    "appointment_type": "F2F",
    "patient_name": "Self"
}, {
    "id": "78a4210df684bc5c9a8cb02a92934403788daaa39dc12299f6cc0fe19480d573",
    "date": "4/9/2020",
    "doctor_name": "Béatrice",
    "appointment_time": "8:21 AM",
    "appointment_type": "F2F",
    "patient_name": "Ahmed"
}, {
    "id": "cd141cf890654a351ae0aa4b1c5d70d8643aaf85993097a2be0fa6a7a5d78a8d",
    "date": "6/24/2019",
    "doctor_name": "Miléna",
    "appointment_time": "9:24 PM",
    "appointment_type": "Video",
    "patient_name": "Khan"
}, {
    "id": "e8258f761a8493581e0ad9f5e479a9daa3987f32b9bc7f7fb60b3f2ae1ad10a2",
    "date": "2/8/2020",
    "doctor_name": "Naëlle",
    "appointment_time": "7:33 AM",
    "appointment_type": "Telephonic",
    "patient_name": "Khan"
}, {
    "id": "c9e1b98c262ac54e1ebec61d37e983f5e6fe9a639e11473114f44a5219688994",
    "date": "8/9/2019",
    "doctor_name": "Audréanne",
    "appointment_time": "8:20 PM",
    "appointment_type": "Telephonic",
    "patient_name": "Khan"
}, {
    "id": "0cb0b9784628d0f13c4d32514d2f9114b7e06f669f9ef42a59ad488450abcbf8",
    "date": "7/15/2019",
    "doctor_name": "Nélie",
    "appointment_time": "8:27 AM",
    "appointment_type": "Telephonic",
    "patient_name": "Khan"
}, {
    "id": "cc1b7162d2a7eb341989961d456fc395673bfd0005a8997d0a215eb827da8f5f",
    "date": "5/25/2019",
    "doctor_name": "Réjane",
    "appointment_time": "7:07 AM",
    "appointment_type": "Video",
    "patient_name": "Ahmed"
}, {
    "id": "ea5fdcb2661467fea17fd5a0199e8baa6e3d48671882d765048b927f4755a188",
    "date": "12/27/2019",
    "doctor_name": "Félicie",
    "appointment_time": "2:50 PM",
    "appointment_type": "F2F",
    "patient_name": "Self"
}, {
    "id": "5d60f64456e532b552886d39b8aab572a30c44466efbe74898cdb2cc316dc546",
    "date": "7/22/2019",
    "doctor_name": "Bénédicte",
    "appointment_time": "1:51 AM",
    "appointment_type": "F2F",
    "patient_name": "Ahmed"
}, {
    "id": "b1b77203e3e51469ccfe8f0552fb5643c4bd6c53d053cf9a10beed6e7b3e2872",
    "date": "6/25/2019",
    "doctor_name": "Laïla",
    "appointment_time": "6:26 AM",
    "appointment_type": "Telephonic",
    "patient_name": "Self"
}, {
    "id": "5a205c288639ffaf661b029151dc90ca0018bedbd4f8edba18a9e4f403c8679f",
    "date": "4/23/2020",
    "doctor_name": "Åsa",
    "appointment_time": "6:31 AM",
    "appointment_type": "Telephonic",
    "patient_name": "Ahmed"
}, {
    "id": "8684f5b7efda38e38118e078d6bb19fe9c4c9458995ad0ddec9183aeb89904ba",
    "date": "2/29/2020",
    "doctor_name": "Dafnée",
    "appointment_time": "3:54 AM",
    "appointment_type": "Video",
    "patient_name": "Khan"
}, {
    "id": "dde61e59347cff834dfe38086a831c2e3f7e8533292420af41a43967c1fa2990",
    "date": "4/22/2020",
    "doctor_name": "Mahélie",
    "appointment_time": "5:45 AM",
    "appointment_type": "F2F",
    "patient_name": "Ahmed"
}, {
    "id": "d7fd368ef2416f813b111106bec1e79e1ff660d78a56ae109976655fe715860e",
    "date": "2/2/2020",
    "doctor_name": "Irène",
    "appointment_time": "10:38 PM",
    "appointment_type": "Telephonic",
    "patient_name": "Self"
}, {
    "id": "1bb32ec7ad04d4c1577b00687efc58039910bc9271c57753a1ca316c3ff6f511",
    "date": "10/22/2019",
    "doctor_name": "Crééz",
    "appointment_time": "1:08 AM",
    "appointment_type": "Video",
    "patient_name": "Self"
}];


let pageNumber = 1;
const MissedScreen = props => {

    const { MissedAppointments, isGetting } = props.MissedAppointments;
    const [pageSize, setPageSize] = useState(10);           //state for the page number
    const [isReady, setIsReady] = React.useState(false);    //state for check loading time


    // useFocusEffect(
    //     useCallback(() => {
    //         props.getMissedAppoint(pageSize, pageNumber);
    //     }, [])
    // );


    useFocusEffect(
        useCallback(() => {
            const restoreState = async () => {
                try {
                    typeof (MissedAppointments) !== 'undefined' && MissedAppointments.length ? (
                        null
                    ) : props.getMissedAppoint(pageSize, pageNumber)
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
        <View>
            <View style={{ flexDirection: 'column-reverse' }}>
                {
                    isGetting && <View style={{ textAlign: 'center', marginTop: 5 }}><ActivityIndicator size="small" color="#00A1DE" /></View>
                }
                {
                    typeof (MissedAppointments) !== 'undefined' && MissedAppointments.length ? (
                        <FlatList
                            data={MissedAppointments}
                            renderItem={({ item }) => (
                                <AppointmentListHandler
                                    appointmentDate={GetAppointmentDate(item.resource.period.start) + ' ' + GetMonthName(item.resource.period.start)}
                                    monthName={GetYear(item.resource.period.start)}
                                    firstitem={'Dr. ' + item.resource.extension[2].valueString}
                                    secondItem={GetDayName(item.resource.period.start) + ', 11:00 PM'}
                                    patientDetails={item.resource.extension[1].valueString + ', ' + item.resource.extension[0].valueString}
                                    assetname={ReturnTypeIcon('F2F')}
                                    tag={'Missed'}
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
                                props.getMissedAppoint(pageSize, pageNumber)
                                //props.getPeople(pageSize, pageNumber, diagType);
                            }}
                        />
                    ) : null
                }


            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column'
    },
});



function mapStateToProps(state) {
    return {
        MissedAppointments: state.MissedAppointments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMissedAppoint: (pageSize, pageNumber) => dispatch(fetchmAppointmentsFromApi(pageSize, pageNumber))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MissedScreen)
//export default memo();