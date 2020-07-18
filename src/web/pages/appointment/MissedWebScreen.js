import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';


import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";
import AppointmentWebHandler from "../../components/AppointmentWebHandler";
import { GetDayName, GetAppointmentDate, GetMonthName, ReturnTypeIcon, GetYear } from '../../../shared/core/datehelper'
import { fetchmAppointmentsFromApi } from "../../../shared/actions/MissedAppointmentActions";
let pageNumber = 1;


const MissedWebScreen = props => {

    const { colors } = useTheme();
    const theme = useTheme();


    const { MissedAppointments, isGetting } = props.MissedAppointments;
    const [pageSize, setPageSize] = useState(20);           //state for the page number
    const [isReady, setIsReady] = React.useState(false);    //state for check loading time

    const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
    React.useEffect(() => {
        const onDimensionsChange = ({ window }) => {
            setDimensions(window);
        };
        Dimensions.addEventListener('change', onDimensionsChange);

        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    }, []);

    const isLargeScreen = dimensions.width >= 1024;
    let columnCount = isLargeScreen ? 2 : 1;


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
        <View style={styles.container}>
            <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
            <View style={{ flex: 1 }}>
                {
                    isGetting && <View style={{ textAlign: 'center', marginBottom: 5 }}><ActivityIndicator size="small" color="#00A1DE" /></View>
                }
                {
                    typeof (MissedAppointments) !== 'undefined' && MissedAppointments.length ? (
                        <FlatList
                            style={{ flexDirection: 'column' }}
                            //contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-evenly' }}
                            data={MissedAppointments}
                            renderItem={({ item }) => (
                                <AppointmentWebHandler
                                    appointmentDate={GetAppointmentDate(item.resource.period.start) + ' ' + GetMonthName(item.resource.period.start)}
                                    monthName={GetYear(item.resource.period.start)}
                                    firstitem={'Dr. ' + item.resource.extension[2].valueString}
                                    secondItem={GetDayName(item.resource.period.start) + ', 11:00 PM'}
                                    patientDetails={item.resource.extension[1].valueString + ', ' + item.resource.extension[0].valueString}
                                    assetname={ReturnTypeIcon('F2F')}
                                //tag={'Cancelled'}
                                />
                            )}
                            horizontal={false}
                            keyExtractor={item => item.resource.id}
                            initialNumToRender={0}
                            key={columnCount}
                            numColumns={columnCount}
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
    );
};


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
)(MissedWebScreen)
//export default MissedWebScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
});