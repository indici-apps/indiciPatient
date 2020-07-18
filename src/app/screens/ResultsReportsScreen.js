import React, { useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, Platform } from 'react-native';

import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import ReportsHandler from '../components/ReportsHandler'
import { GetAppointmentDate, GetMonthName, GetYear } from '../../shared/core/datehelper'
import { fetchReportsFromApi } from "../../shared/actions/ReportsActions";




let pageNumber = 1;
let pageSize = 100;
const ResultsReportsScreen = props => {
    const { Reports, isFetching } = props.Reports;

    useFocusEffect(
        useCallback(() => {
            //console.log(getUserId())
            props.getReports();
        }, [])
    );
    return (
        <View style={styles.screenContainer}>
            {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
            {/* <ReportsHandler name="haseeb Ahmed" reportdetails="Scanned Document 20th Feb 2020"/> */}
            {
                isFetching && <Text>Loading...</Text>
            }
            {
                <FlatList
                    data={Reports}
                    renderItem={({ item }) => (
                        <ReportsHandler
                            rptDate={GetAppointmentDate(item.resource.created) + ' ' + GetMonthName(item.resource.created)}
                            rptYear={GetYear(item.resource.created)}
                            name={item.resource.content[0].attachment.title}
                            reportdetails={item.resource.author[0].display}
                            reportLink={'http://dummyimage.com/121x231.jpg/cc0000/ffffff'}
                        />
                    )}
                    keyExtractor={item => item.resource.id}
                />
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
        Reports: state.Reports
    }
}
let token = '';
function mapDispatchToProps(disptach) {
    return {
        getReports: () => disptach(fetchReportsFromApi(token, pageSize, pageNumber))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultsReportsScreen)
//export default ResultsReportsScreen;
