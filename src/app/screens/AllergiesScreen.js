import React, { useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, Platform } from 'react-native';

import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import AllergiesHandler from '../components/AllergiesHandler';
import { fetchAllergyFromApi } from "../../shared/actions/AllergiesActions";
import Colors from '../../shared/constants/Colors'




function GetTagColor(allergyLevel) {
    if (allergyLevel === 'severe') {
        return { backgroundColor: Colors.highAllergy, borderRadius: 50, }
    }
    if (allergyLevel === 'moderate') {
        return { backgroundColor: Colors.midAllergy, borderRadius: 50, }
    }
    if (allergyLevel === 'mild') {
        return { backgroundColor: Colors.lowAllergy, borderRadius: 50, }
    }
}

function GetTagName(allergyLevel) {
    if (allergyLevel === 'severe') {
        return 'High'
    }
    if (allergyLevel === 'moderate') {
        return 'Mild'
    }
    if (allergyLevel === 'mild') {
        return 'Low'
    }
}

let pageNumber = 1;
let pageSize = 100;
const AllergiesScreen = props => {
    const { Allergies, isGetting } = props.Allergies;
    useFocusEffect(
        useCallback(() => {
            //console.log(getUserId())
            props.getAlg();
        }, [])
    );
    return (
        <View style={styles.screenContainer}>
            {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 20, width: 20, backgroundColor: Colors.lowAllergy }}></View>
                    <Text style={{ marginLeft: 10 }}>Low</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 20, width: 20, backgroundColor: Colors.midAllergy }}></View>
                    <Text style={{ marginLeft: 10 }}>Mild</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 20, width: 20, backgroundColor: Colors.highAllergy }}></View>
                    <Text style={{ marginLeft: 10 }}>High</Text>
                </View>
            </View>
            {/* <AllergiesHandler styles={{ backgroundColor: Colors.lowAllergy, borderRadius: 50, }} /> */}

            {
                isGetting && <Text>Loading...</Text>
            }
            {

                <FlatList
                    style={{ marginTop: 15 }}
                    data={Allergies}
                    renderItem={({ item }) => (
                        <AllergiesHandler
                            styles={GetTagColor(item.resource.hasOwnProperty('reaction') ? item.resource.reaction[0].severity : 'moderate')}
                            algLevel={GetTagName(item.resource.hasOwnProperty('reaction') ? item.resource.reaction[0].severity : 'moderate')}
                            algTitle={item.resource.code.text}
                            algType={item.resource.extension[0].valueString}
                            symptoms={item.resource.hasOwnProperty('reaction') ? item.resource.reaction[0].manifestation[0].text : 'Not Available'}
                            comment={item.resource.note[0].text}
                        />
                    )}
                    keyExtractor={item => item.resource.id}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                    }}
                />
            }

            {/* <FlatList
                data={Allergies}
                renderItem={({ item }) => (
                    <AllergiesHandler
                        styles={GetTagColor(item.allergy_level)}
                        algLevel={item.allergy_level}
                        algTitle={item.allergy_title}
                        algType={item.allergy_type}
                        symptoms={item.allergy_symptoms}
                        comment={item.comments}
                    />
                )}
                keyExtractor={item => item.resource.id}
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
        Allergies: state.Allergies
    }
}
let token = '';
function mapDispatchToProps(disptach) {
    return {
        getAlg: () => disptach(fetchAllergyFromApi(token, pageNumber, pageSize))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllergiesScreen)
//export default AllergiesScreen;
