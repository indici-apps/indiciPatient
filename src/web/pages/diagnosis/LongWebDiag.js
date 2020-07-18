import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";
import DiagnosisWebHandler from "../../components/DiagnosisWebHandler";

import { fetchLongTermFromApi } from "../../../shared/actions/DiagnosisActions";
import { fetchLongMorePeopleFromApi } from "../../../shared/actions/DiagnosisActions";

import { GetAppointmentDate, GetMonthName, GetYear } from '../../../shared/core/datehelper'
import Colors from '../../../shared/constants/Colors'



let pageNumber = 1;
let pageSize = 30;



const LongWebDiag = props => {
    const { colors } = useTheme();
    const theme = useTheme();

    const { LongDiag, isFetching } = props.LongDiag;
    const [isReady, setIsReady] = React.useState(false);


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
        // useCallback(() => {
        //     //alert('Long Terms is Focused Now
        //     // typeof (LongDiag) !== 'undefined' && LongDiag.length ? (
        //     //     null
        //     // ) :  props.getPeopleLong()

        // }, [])
        useCallback(() => {
            //alert('Long Terms is Focused Now');
            //console.log(people.length)

            const restoreState = async () => {
                try {
                    typeof (LongDiag) !== 'undefined' && LongDiag.length ? (
                        null
                    ) : props.getPeopleLong()
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


    function GetTagColor(allergyLevel) {
        return { backgroundColor: Colors.highAllergy }
    }


    //doing the conditional rendering 
    function CheckLongTerm(props) {
        const results = props.results;
        if (results.resource.extension[0].valueBoolean == true) {
            return <DiagnosisWebHandler
                styles={GetTagColor('Long')}
                date={GetAppointmentDate(results.resource.onsetDateTime) + ' ' + GetMonthName(results.resource.onsetDateTime)}
                month={GetYear(results.resource.onsetDateTime)}
                //type_diagnoes={results.resource.resourceType}
                comments={results.resource.note[0].text}
            />
        }
        else {
            return null
        }
    }

    return (
        <View style={styles.container}>
            {
                isFetching && <Text> Loading....</Text>
            }
            {
                typeof (LongDiag) !== 'undefined' && LongDiag.length ? (
                    <FlatList
                        data={LongDiag}
                        renderItem={({ item }) => (
                            <CheckLongTerm results={item} />
                        )}
                        keyExtractor={item => Math.random().toString()}
                        horizontal={false}
                        keyExtractor={item => item.resource.id}
                        initialNumToRender={0}
                        key={columnCount}
                        numColumns={columnCount}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            // console.log('end is near')
                            pageNumber = pageNumber + 1;
                            props.getPeopleLongMoreSuccess();
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
        LongDiag: state.LongDiag
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPeopleLong: () => dispatch(fetchLongTermFromApi(pageSize, pageNumber, 'Not')),
        getPeopleLongMoreSuccess: () => dispatch(fetchLongMorePeopleFromApi(pageSize, pageNumber, 'Not'))
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LongWebDiag)
