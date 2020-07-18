import React, { useCallback } from 'react'
import { Button, View, Text, SafeAreaView, Dimensions, StyleSheet, FlatList } from 'react-native';

import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import AllergiesWebHandler from "../components/AllergiesWebHandler";

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
const AllergiesWebScreen = props => {

    const { Allergies, isGetting } = props.Allergies;
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
            //console.log(getUserId())
            props.getAlg();
        }, [])
    );
    return (
        <View style={styles.cotainer}>
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


            {
                isGetting && <Text>Loading...</Text>
            }
            {

                <FlatList
                    style={{ marginTop: 15 }}
                    data={Allergies}
                    renderItem={({ item }) => (
                        <AllergiesWebHandler
                            styles={GetTagColor(item.resource.hasOwnProperty('reaction') ? item.resource.reaction[0].severity : 'moderate')}
                            algLevel={GetTagName(item.resource.hasOwnProperty('reaction') ? item.resource.reaction[0].severity : 'moderate')}
                            algTitle={item.resource.code.text}
                            algType={item.resource.extension[0].valueString}
                            symptoms={item.resource.hasOwnProperty('reaction') ? item.resource.reaction[0].manifestation[0].text : 'Not Available'}
                            comment={item.resource.note[0].text}
                        />
                    )}
                    keyExtractor={item => item.resource.id}
                    horizontal={false}
                    key={columnCount}
                    numColumns={columnCount}
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
    cotainer: {
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
)(AllergiesWebScreen)
//export default AllergiesWebScreen;