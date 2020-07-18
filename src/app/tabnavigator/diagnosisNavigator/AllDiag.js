import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';
import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";


import DiagnosisHandler from '../../components/DiagnosisHandler';

import { fetchPeopleFromApi } from "../../../shared/actions/DiagnosisActions";
import { fetchMorePeopleFromApi } from "../../../shared/actions/DiagnosisActions";


import { GetAppointmentDate, GetMonthName, GetYear } from '../../../shared/core/datehelper'
import Colors from '../../../shared/constants/Colors';





let token = '';



const DATA = [{
    "id": "e296467a8a1b6500f1f03b00977e9a5e8efba14e0bc4e716cd36b5db1e1fd3d9",
    "allergy_symptoms": "vitae mattis",
    "comments": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    "date": "5/24/2019",
    "type": "recent"
}, {
    "id": "f56be178e22124756f5f6a5f6a2bf4103f630e9bc1cc2727624f348e0f1bf6f3",
    "allergy_symptoms": "sollicitudin ut suscipit a feugiat",
    "comments": "Vivamus vestibulum sagittis sapien.",
    "date": "2/20/2020",
    "type": "long"
}, {
    "id": "e077bae2a52c42bc8487635a82fba8bf97b5860475203fe91f4510796d805926",
    "allergy_symptoms": "iaculis",
    "comments": "Vestibulum ac est lacinia nisi venenatis tristique.",
    "date": "1/11/2020",
    "type": "long"
}, {
    "id": "8e63a8b87c2cc0430f03ac1a37601acc14bb88b8d2440d5ff871455e50747d50",
    "allergy_symptoms": "massa tempor convallis",
    "comments": "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.",
    "date": "1/25/2020",
    "type": "recent"
}, {
    "id": "23790609646a74434c45a7bca39d898b4bcbbfaeadcf2b715e9c93f25a5558b1",
    "allergy_symptoms": "mauris enim leo rhoncus",
    "comments": "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    "date": "6/12/2019",
    "type": "recent"
}, {
    "id": "1a50ebb2fad2d22983317a9173468ebea46ad3d81882e3d3c928e53e283a3176",
    "allergy_symptoms": "sollicitudin vitae consectetuer eget rutrum",
    "comments": "Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.",
    "date": "9/3/2019",
    "type": "long"
}, {
    "id": "0a2fa72e914661e5b66889bef17d2153ba7f353a54c8236211e8bfcc186a0c06",
    "allergy_symptoms": "ante ipsum",
    "comments": "Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
    "date": "6/28/2019",
    "type": "recent"
}, {
    "id": "05b902570afb6c81af161b79a6018c5410ee1c189c7571e2a50cd58428fbfe27",
    "allergy_symptoms": "sagittis dui vel nisl duis",
    "comments": "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
    "date": "11/1/2019",
    "type": "recent"
}, {
    "id": "dfd850b70740267c83f21429017b034144438057cff2de6208ac28357fde0e56",
    "allergy_symptoms": "ut rhoncus aliquet pulvinar",
    "comments": "In sagittis dui vel nisl.",
    "date": "9/8/2019",
    "type": "recent"
},

{
    "id": "eec9cf6b8607fca36788135268d96b886ccbcddae4a005f826c156452c1effcd",
    "allergy_symptoms": "varius",
    "comments": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
    "date": "9/23/2019",
    "type": "long"
},

{
    "id": "e69de8fa2d889933da2d86ac39d9be2884181eb888ca2b8fac01b7b4b2f7591c",
    "allergy_symptoms": "amet",
    "comments": "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    "date": "3/7/2020",
    "type": "long"
},
{
    "id": "c9a936984062be2ada2e209af7b3e00f00ecb7c1c49fa078462524d13739a7a6",
    "allergy_symptoms": "habitasse platea",
    "comments": "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.",
    "date": "9/23/2019",
    "type": "long"
},
];


let pageNumber = 1;
// let pageSize = 10;



const AllDiag = props => {
    const { people, isFetching } = props.people;

    const [pageSize, setPageSize] = useState(10);           //state for the page number
    const [diagType, setdiagType] = useState('All');        //state for checking type
    const [isReady, setIsReady] = React.useState(false);    //state for check loading time


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
        <DiagnosisHandler
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
        <View style={styles.screenContainer}>
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
                        initialNumToRender={10}
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
    screenContainer: {
        flex: 1,
        flexDirection: "column",

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
)(AllDiag)
//export default AllDiag;