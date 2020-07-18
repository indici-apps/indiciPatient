import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";

import DiagnosisWebHandler from "../../components/DiagnosisWebHandler";
import { fetchPeopleFromApi } from "../../../shared/actions/DiagnosisActions";
import { fetchMorePeopleFromApi } from "../../../shared/actions/DiagnosisActions";


import { GetAppointmentDate, GetMonthName, GetYear } from '../../../shared/core/datehelper'
import Colors from '../../../shared/constants/Colors';



let pageNumber = 1;


const AllWebDiag = props => {
    const { colors } = useTheme();
    const theme = useTheme();

    const { people, isFetching } = props.people;
    const [pageSize, setPageSize] = useState(20);           //state for the page number
    const [diagType, setdiagType] = useState('All');        //state for checking type
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
                    typeof (people) !== 'undefined' && people.length ? (
                        null
                    ) : props.getPeople(pageSize, pageNumber, diagType)
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


    //returns the tag color based on diagnosis
    const GetTagColor = (type) => {
        if (type === true) {
            return { backgroundColor: Colors.highAllergy }
        }
        else {
            return { backgroundColor: Colors.lowAllergy }
        }
    }


    //render items to flat list
    const renderItem = ({ item }) => (
        <DiagnosisWebHandler
            styles={GetTagColor(item.resource.extension[0].valueBoolean)}
            date={GetAppointmentDate(item.resource.onsetDateTime) + ' ' + GetMonthName(item.resource.onsetDateTime)}
            month={GetYear(item.resource.onsetDateTime)}
            //type_diagnoes={item.resource.resourceType}
            comments={item.resource.note[0].text}
        />
    );


    const keyExtractor = ({ item }) => (item.resource.id)
    const getItemLayout = (data, index) => (
        { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
    );


    if (!isReady) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 20, width: 20, backgroundColor: Colors.highAllergy }}></View>
                    <Text style={{ marginLeft: 10 }}>Long Term</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 20, width: 20, backgroundColor: Colors.lowAllergy }}></View>
                    <Text style={{ marginLeft: 10 }}>Recent</Text>
                </View>
            </View>

            {
                isFetching && <Text> Loading....</Text>
            }
            {
                typeof (people) !== 'undefined' && people.length ? (
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={people}
                        renderItem={renderItem}
                        keyExtractor={item => item.resource.id}
                        horizontal={false}
                        key={columnCount}
                        numColumns={columnCount}
                        initialNumToRender={0}
                        maxToRenderPerBatch={10}
                        windowSize={7}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            pageNumber = pageNumber + 1;
                            props.getPeople(pageSize, pageNumber, diagType);
                        }}
                    />
                ) : null

            }
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',

    },
    wrapContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});


function mapStateToProps(state) {
    return {
        people: state.people
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPeople: (pageSize, pageNumber, diagType) => dispatch(fetchPeopleFromApi(pageSize, pageNumber, diagType)),
        getPeopleMoreSuccess: (pageSize, pageNumber, diagType) => dispatch(fetchMorePeopleFromApi(pageSize, pageNumber, diagType)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllWebDiag)
//export default AllWebDiag;