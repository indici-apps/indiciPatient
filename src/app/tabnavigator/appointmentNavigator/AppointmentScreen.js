import React, { memo, useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList, InteractionManager, ActivityIndicator } from 'react-native';
import Svg, { Defs, Pattern, LinearGradient, Stop } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { } from 'react-native-svg';
import { Image as SvgImage } from 'react-native-svg';
import AppointmentListHandler from '../../components/AppointmentListHandler';
import { GetDayName, GetAppointmentDate, GetMonthName, ReturnTypeIcon, GetYear } from '../../../shared/core/datehelper';



import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";
import { fetchfAppointmentsFromApi } from "../../../shared/actions/FutureAppointActions";

const AppointmentScreen = props => {

    const actionOnRow = (item) => {
        Alert.alert(
            "Cancel Appointment",
            "Are you sure you want to cancel this Appointment?",
            [
                {
                    text: "No",
                    onPress: () => console.log('Hello World Not cancel'),
                    style: "cancel"
                },
                { text: "Yes", onPress: () =>  console.log('Selected Item :', item.resource.id) }
            ],
            { cancelable: false }
        )
    }

    const { FutureAppointments, isGetting } = props.FutureAppointments;
    const [pageSize, setPageSize] = useState(100);           //state for the page number
    const [isReady, setIsReady] = React.useState(false);    //state for check loading time
    useFocusEffect(
        useCallback(() => {
            props.getAppoint(pageSize);
        }, [])
    );
    return (
        <View style={styles.mainView}>


            <View style={{ flex: 1, marginBottom: 5 }}>
                {
                    isGetting && <View style={{ textAlign: 'center', marginBottom: 5 }}><ActivityIndicator size="small" color="#00A1DE" /></View>
                }
                {
                    typeof (FutureAppointments) !== 'undefined' && FutureAppointments.length ? (
                        <FlatList
                            data={FutureAppointments}
                            renderItem={({ item }) => (


                                <TouchableOpacity onPress={() => actionOnRow(item)}>
                                    <AppointmentListHandler
                                        appointmentDate={GetAppointmentDate(item.resource.period.start) + ' ' + GetMonthName(item.resource.period.start)}
                                        monthName={GetYear(item.resource.period.start)}
                                        firstitem={'Dr. ' + item.resource.extension[2].valueString}
                                        secondItem={GetDayName(item.resource.period.start) + ', 11:00 PM'}
                                        patientDetails={item.resource.extension[1].valueString + ', ' + item.resource.extension[0].valueString}
                                        assetname={ReturnTypeIcon('F2F')}
                                    //tag={'Cancelled'}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.resource.id}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={7}
                        />
                    ) : null
                }

            </View>

            <View style={{ width: '100%', height: 60, alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', height: 40, marginTop: 10, width: '50%', backgroundColor: '#00A1DE', borderRadius: 20 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('BookApp')}>
                        <View >
                            <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: '#fff' }} >
                                Book an Appointment
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={{marginBottom: 100}}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <AppointmentListHandler
                            appointmentDate={'25-5'}
                            monthName={'2020'}
                            firstitem={'Dr. Apple'}
                            secondItem={'Tuesday, 11:00 PM'}
                            patientDetails={'Haseeb Ahmed, Face to Face'}
                            assetname={ReturnTypeIcon('F2F')}
                        //tag={'Cancelled'}
                        />
                        // <AppointmentListHandler
                        //     appointmentDate={GetAppointmentDate(item.resource.period.start) + ' ' + GetMonthName(item.resource.period.start)}
                        //     monthName={GetYear(item.resource.period.start)}
                        //     firstitem={'Dr. ' + item.resource.extension[2].valueString}
                        //     secondItem={GetDayName(item.resource.period.start) + ', 11:00 PM'}
                        //     patientDetails={item.resource.extension[1].valueString + ', ' + item.resource.extension[0].valueString}
                        //     assetname={ReturnTypeIcon('F2F')}
                        // //tag={'Cancelled'}
                        // />
                    )}
                   // keyExtractor={item => item.resource.id}
                />



            </View>
            <View style={{ width: '100%', height: 60, alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', height: 40, marginTop: 0, width: '50%', backgroundColor: '#00A1DE', borderRadius: 20 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('BookApp')}>
                        <View >
                            <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: '#fff' }} >
                                Book an Appointment
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View> */}
        </View>
    );

}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column'
    },
});


function mapStateToProps(state) {
    return {
        FutureAppointments: state.FutureAppointments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAppoint: (pageSize) => dispatch(fetchfAppointmentsFromApi(pageSize, 1))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppointmentScreen)
//export default memo(AppointmentScreen);