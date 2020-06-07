import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList } from 'react-native';


const AppointmentListHandler = props => (




    <View style={{ marginTop: 5, borderWidth: 0.5, borderColor: '#D1D1D6', position: 'relative', backgroundColor: 'white', flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0, marginBottom: 0 }}>
            <View style={{ flex: 2, marginLeft: 10, justifyContent: 'flex-start' }}>
                <View style={styles.dateSectionMainStyle}>
                    <View style={styles.dateSectionBackground}></View>
                    <View style={styles.dateSectionTextPlacement}>
                        <Text style={styles.toptextDate}>{props.appointmentDate}</Text>
                        <Text style={styles.toptextDate}>{props.monthName}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 8, justifyContent: 'center', marginTop: 0, alignContent: 'center' }}>
                <Text style={styles.appointmentScreen1_group4263_notificationsfaaa3c46}>{props.firstitem}</Text>
                <Text style={styles.appointmentScreen1_group4263_notificationsbcf0b121}>{props.secondItem}</Text>
                <Text style={styles.appointmentScreen1_group4263_notifications}>{props.patientDetails}</Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'flex-start' }}>
                <View style={styles.appointmentTypeStyle}>
                    {/* <View style={styles.appointmentTypeBox}>
                        <Text style={styles.appointmentTypeStyleText}>{props.tag}</Text>
                    </View> */}
                    <Image style={{ height: 40, width: 40 }} source={props.assetname} />
                </View>
            </View>
        </View>
    </View>

);

const styles = StyleSheet.create({
    dateSectionMainStyle: {
        "opacity": 1,
        "position": "relative",
        "backgroundColor": "transparent",
        "width": 50,
        height: 75,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateSectionBackground: {
        opacity: 1,
        backgroundColor: "#CFCFCF",
        borderRadius: 5,
        width: 55,
        height: 65,
       
    },
    dateSectionTextPlacement: {
        "opacity": 1,
        "position": "absolute",
        height: '100%',
        width: '100%',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        

    },
    appointmentTypeStyle: {
        marginTop: 5,
        marginBottom: 5,
        marginRight: 35,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',


    },

    appointmentTypeBox: {
        backgroundColor: '#C5C5C5',
        borderRadius: 5,
        marginBottom: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    appointmentTypeStyleText: {
        textAlign: 'center',
        width: 80,
        marginBottom: 5,
        color: '#00A500',
        fontWeight: '400',
        fontSize: 16
    },
    toptextDate:{
        fontSize: 14
    }


});

export default AppointmentListHandler;