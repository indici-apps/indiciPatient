import React, { useCallback, useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';
import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";
import ImmuneHandler from '../../components/ImmuneHandler';
import { GetAppointmentDate, GetMonthName, GetYear } from '../../../shared/core/datehelper'
import { fetchImmunefromApi } from "../../../shared/actions/ImmuneActions";
import { fetchMoreImmunefromApi } from "../../../shared/actions/ImmuneActions";
import Colors from '../../../shared/constants/Colors'

let pageNumber = 1;



function GetTagColor(type) {

    if (type.resource.extension[10].valueBoolean == true) {
        return { backgroundColor: Colors.highAllergy }
    }
    else if (type.resource.extension[11].valueBoolean == true) {
        return { backgroundColor: Colors.midAllergy }
    }
    else {
        return { backgroundColor: Colors.lowAllergy }
    }
}

const AllImm = props => {
    const [pageSize, setPageSize] = useState(10);
    const { Immune, isGetting } = props.Immune;
    const [isReady, setIsReady] = React.useState(false);    //state for check loading time
    useFocusEffect(
        useCallback(() => {
            const restoreState = async () => {
                try {
                    typeof (Immune) !== 'undefined' && Immune.length ? (
                        null
                    ) : props.getImmune(pageSize, pageNumber)
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
        <View style={styles.screenContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 20, width: 20, backgroundColor: Colors.highAllergy }}></View>
                    <Text style={{ marginLeft: 10 }}>Due</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 20, width: 20, backgroundColor: Colors.midAllergy }}></View>
                    <Text style={{ marginLeft: 10 }}>OverDue</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 20, width: 20, backgroundColor: Colors.lowAllergy }}></View>
                    <Text style={{ marginLeft: 10 }}>Administered</Text>
                </View>
            </View>
            {
                isGetting && <Text> Loading....</Text>
            }
            {
                typeof (Immune) !== 'undefined' && Immune.length ? (
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={Immune}
                        renderItem={({ item }) => (
                            <ImmuneHandler
                                styles={GetTagColor(item)}
                                date={GetAppointmentDate(item.resource.extension[12].valueDateTime) + ' ' + GetMonthName(item.resource.extension[12].valueDateTime)}
                                month={GetYear(item.resource.extension[12].valueDateTime)}
                                type_diagnoes={item.resource.extension[0].valueString}
                                indication={'Indication: ' + item.resource.extension[5].valueString}
                                vacc={'Vaccinator: ' + item.resource.extension[6].valueString}
                                datedue={'Due Date: ' + GetAppointmentDate(item.resource.extension[7].valueDateTime) + ' ' + GetMonthName(item.resource.extension[7].valueDateTime) + ' ' + GetYear(item.resource.extension[7].valueDateTime)}
                            />
                        )}
                        keyExtractor={item => item.resource.id}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={7}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            pageNumber = pageNumber + 1
                            {
                                !isGetting && props.getImmuneMoreSuccess(pageSize, pageNumber);
                            }
                            //console.log('The length: '+Immune.length)
                            
                          //  
                        }}
                    />
                ) : console.log(isGetting)

            }
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",

    },
});

function mapStateToProps(state) {
    return {
        Immune: state.Immune
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getImmune: (pageSize, pageNumber) => dispatch(fetchImmunefromApi(pageSize, pageNumber)),
        getImmuneMoreSuccess: (pageSize, pageNumber) => dispatch(fetchMoreImmunefromApi(pageSize, pageNumber)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllImm)
//export default Due;
