import React, { useCallback } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';
import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";

import DiagnosisHandler from '../../components/DiagnosisHandler';
import { fetchLongTermFromApi } from "../../../shared/actions/DiagnosisActions";
import { fetchLongMorePeopleFromApi } from "../../../shared/actions/DiagnosisActions";

import { GetAppointmentDate, GetMonthName, GetYear } from '../../../shared/core/datehelper'
import Colors from '../../../shared/constants/Colors'

let token = '';


const DATA = [{
    "id": "f56be178e22124756f5f6a5f6a2bf4103f630e9bc1cc2727624f348e0f1bf6f3",
    "allergy_symptoms": "sollicitudin ut suscipit a feugiat",
    "comments": "Vivamus vestibulum sagittis sapien.",
    "date": "2/20/2020"
}, {
    "id": "e077bae2a52c42bc8487635a82fba8bf97b5860475203fe91f4510796d805926",
    "allergy_symptoms": "iaculis",
    "comments": "Vestibulum ac est lacinia nisi venenatis tristique.",
    "date": "1/11/2020"
}, {
    "id": "1a50ebb2fad2d22983317a9173468ebea46ad3d81882e3d3c928e53e283a3176",
    "allergy_symptoms": "sollicitudin vitae consectetuer eget rutrum",
    "comments": "Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.",
    "date": "9/3/2019"
}, {
    "id": "c9a936984062be2ada2e209af7b3e00f00ecb7c1c49fa078462524d13739a7a6",
    "allergy_symptoms": "habitasse platea",
    "comments": "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.",
    "date": "9/23/2019"
}, {
    "id": "eec9cf6b8607fca36788135268d96b886ccbcddae4a005f826c156452c1effcd",
    "allergy_symptoms": "varius",
    "comments": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
    "date": "9/23/2019"
}];


let pageNumber = 1;
let pageSize = 30;





function GetTagColor(allergyLevel) {
    return { backgroundColor: Colors.highAllergy }
}
const LongTermsDiag = props => {
    const { LongDiag, isFetching } = props.LongDiag;
    const [isReady, setIsReady] = React.useState(false);
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
    //doing the conditional rendering 
    function CheckLongTerm(props) {
        const results = props.results;
        if (results.resource.extension[0].valueBoolean == true) {
            return <DiagnosisHandler
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
        <View style={styles.screenContainer}>
            {/* <DiagnosisHandler /> */}
            {/* <TouchableHighlight onPress={() => props.getPeople()}>
                <Text>Load People</Text>
            </TouchableHighlight> */}

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
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            // console.log('end is near')
                            pageNumber = pageNumber + 1;
                            props.getPeopleLongMoreSuccess();
                        }}
                    />
                ) : null

            }
            {/* <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <DiagnosisHandler
                        styles={GetTagColor('Long')}
                        date={GetAppointmentDate(item.date) + ' ' + GetMonthName(item.date)}
                        month={GetYear(item.date)}
                        type_diagnoes={item.allergy_symptoms}
                        comments={item.comments}
                    />
                )}
                keyExtractor={item => item.id}
            /> */}

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
)(LongTermsDiag)
// export default LongTermsDiag;