import React, { useCallback } from 'react';
import { Button, View, Text, SafeAreaView, Dimensions, StyleSheet, FlatList } from 'react-native';

import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import TimelineHandler from "../../app/components/TimelineHandler";
import { GetAppointmentDate, GetMonthName, GetYear } from '../../shared/core/datehelper'
import { fetchTimelineFromApi } from "../../shared/actions/TimelineActions";

import Colors from '../../shared/constants/Colors'

let token = '';
let pageNumber = 1;
let pageSize = 100;

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

const TimelineWebScreen = props => {


    const { Timeline, isGetting } = props.Timeline;
    const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
    React.useEffect(() => {
        const onDimensionsChange = ({ window }) => {
            setDimensions(window);
        };
        Dimensions.addEventListener('change', onDimensionsChange);

        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    }, []);

    useFocusEffect(
        useCallback(() => {
            //console.log(getUserId())
            props.getTimeline();
        }, [])
    );

    const isLargeScreen = dimensions.width >= 1024;
    let columnCount = isLargeScreen ? 2 : 1;



    return (
        <View style={styles.container}>
            {
                isGetting && <Text style={{ textAlign: 'center', marginTop: 5 }}> Loading...</Text>
            }
            {
                <FlatList
                    data={Timeline}
                    renderItem={({ item }) => (
                        <TimelineHandler
                            tmDate={GetAppointmentDate(item.resource.created) + ' ' + GetMonthName(item.resource.created)}
                            tmMonth={GetYear(item.resource.created)}
                            doctor_name={item.resource.author.display}
                            time={GetAppointmentDate(item.resource.created) + ' ' + GetMonthName(item.resource.created) + ' ' + GetYear(item.resource.created)}
                            doctor_comment={item.resource.code.coding[0].display + '\n' + item.resource.code.text}
                        // selected={!!selected.get(item.id)}
                        // onSelect={onSelect}
                        />
                    )}
                    keyExtractor={item => item.resource.id}
                    horizontal={false}
                    initialNumToRender={0}
                    maxToRenderPerBatch={10}
                    windowSize={7}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                    }}
                />
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
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
)(TimelineWebScreen)

//export default TimelineWebScreen;