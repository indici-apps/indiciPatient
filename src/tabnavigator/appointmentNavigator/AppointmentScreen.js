import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList, InteractionManager } from 'react-native';
import Svg, { Defs, Pattern, LinearGradient, Stop } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { } from 'react-native-svg';
import { Image as SvgImage } from 'react-native-svg';
import AppointmentListHandler from '../../components/AppointmentListHandler';
import { GetDayName, GetAppointmentDate, GetMonthName, ReturnTypeIcon, GetYear } from '../../core/datehelper'

const DATA = [{
    "id": "1",
    "date": "7/8/2020",
    "doctor_name": "Secombe",
    "appointment_time": "3:57 PM",
    "appointment_type": "F2F",
    "patient_name": "Ahmed"
}, {
    "id": "2",
    "date": "7/28/2020",
    "doctor_name": "Beeson",
    "appointment_time": "1:01 AM",
    "appointment_type": "F2F",
    "patient_name": "Self"
}, {
    "id": "3",
    "date": "6/26/2020",
    "doctor_name": "Freemantle",
    "appointment_time": "10:21 PM",
    "appointment_type": "F2F",
    "patient_name": "Self"
}, {
    "id": "4",
    "date": "6/25/2020",
    "doctor_name": "Rotlauf",
    "appointment_time": "5:17 AM",
    "appointment_type": "Video",
    "patient_name": "Self"
}, {
    "id": "5",
    "date": "6/21/2020",
    "doctor_name": "Russam",
    "appointment_time": "9:22 AM",
    "appointment_type": "F2F",
    "patient_name": "Self"
}, {
    "id": "6",
    "date": "6/30/2020",
    "doctor_name": "Chrystie",
    "appointment_time": "11:56 AM",
    "appointment_type": "Telephonic",
    "patient_name": "Ahmed"
}, {
    "id": "7",
    "date": "6/2/2020",
    "doctor_name": "Rylance",
    "appointment_time": "2:09 PM",
    "appointment_type": "Video",
    "patient_name": "Haseeb"
}, {
    "id": "8",
    "date": "6/3/2020",
    "doctor_name": "Bengtsen",
    "appointment_time": "12:10 AM",
    "appointment_type": "Video",
    "patient_name": "Haseeb"
}, {
    "id": "9",
    "date": "8/4/2020",
    "doctor_name": "Itzkovitch",
    "appointment_time": "4:31 AM",
    "appointment_type": "Telephonic",
    "patient_name": "Haseeb"
}, {
    "id": "10",
    "date": "7/21/2020",
    "doctor_name": "Copner",
    "appointment_time": "4:01 PM",
    "appointment_type": "Telephonic",
    "patient_name": "Haseeb"
}];


const AppointmentScreen = ({ navigation }) => {
    // const [isLoading, setIsLoading] = React.useState(true);

    // React.useEffect(() => {
    //     // // setTimeout(() => {
    //     // //     setIsLoading(false);
    //     // // }, 1500);
    //     // setIsLoading(false);
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 1000);
    // }, []);


    // if (isLoading) {
    //     return <View style={{flex: 1 , justifyContent: "center" , alignItems: "center"}}>
    //         <Text>Loading.....</Text>
    //     </View>
    // }

    return (
        <View style={styles.mainView}>
            <View style={{ width: '100%', height: 60, alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', height: 40, marginTop: 10, width: '50%', backgroundColor: '#00A1DE', borderRadius: 20 }}>
                    <TouchableOpacity>
                        <View >
                            <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: '#fff' }} >
                                Book an Appointment
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>


            {/* List view styles for the appointment details */}
            <View style={{ marginTop: 60 }}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <AppointmentListHandler
                            appointmentDate={GetAppointmentDate(item.date)+' '+GetMonthName(item.date)}
                            monthName={GetYear(item.date)}
                            firstitem={'Dr. ' + item.doctor_name}
                            secondItem={GetDayName(item.date) + ', ' + item.appointment_time}
                            patientDetails={item.patient_name + ', ' + item.appointment_type}
                            assetname={ReturnTypeIcon(item.appointment_type)}
                            // tag={'NEW'}
                        />
                    )}
                    keyExtractor={item => item.id}
                />


                {/* <AppointmentListHandler name="Dr. Haseeb" /> */}
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column-reverse'
    },
});
export default memo(AppointmentScreen);