import React, { useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar,  FlatList, Platform } from 'react-native';


import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import Colors from '../../shared/constants/Colors'
import TimelineHandler from '../components/TimelineHandler'
import { GetAppointmentDate, GetMonthName, GetYear } from "../../shared/core/datehelper";
import { fetchTimelineFromApi } from "../../shared/actions/TimelineActions";




function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
}


const TimelineScreen = props => {

    const { Timeline, isGetting } = props.Timeline;
    useFocusEffect(
        useCallback(() => {
            //console.log(getUserId())
            props.getTimeline();
        }, [])
    );
    return (
        <View style={styles.screenContainer}>
            {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}


            <FlatList
                style={{ marginTop: 10 }}
                data={Timeline}
                renderItem={({ item }) => (
                    <TimelineHandler
                        tmDate={GetAppointmentDate(item.resource.created) + ' ' + GetMonthName(item.resource.created)}
                        tmMonth={GetYear(item.resource.created)}
                        doctor_name={item.resource.author.display}
                        time={GetAppointmentDate(item.resource.created) + ' ' + GetMonthName(item.resource.created)+ ' '+GetYear(item.resource.created)}
                        doctor_comment={item.resource.code.coding[0].display + '\n' + item.resource.code.text}
                    // selected={!!selected.get(item.id)}
                    // onSelect={onSelect}
                    />
                )}
                keyExtractor={item => item.resource.id}

            />
        </View>
    );
};
const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.defaultBackground,

    },

});


function mapStateToProps(state) {
    return {
        Timeline: state.Timeline
    }
}


function mapDispatchToProps(disptach) {
    return {
        getTimeline: () => disptach(fetchTimelineFromApi(100, 1))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimelineScreen)
//export default TimelineScreen;
