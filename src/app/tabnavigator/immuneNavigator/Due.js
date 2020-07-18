import React, { useCallback } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';
import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";
import ImmuneHandler from '../../components/ImmuneHandler';

import { fetchImmunefromApi } from "../../../shared/actions/ImmuneActions";


let pageNumber = 1;
let pageSize = 100;
const Due = props => {

    const { Immune, isGetting } = props.Immune;

    useFocusEffect(
        useCallback(() => {
            //alert('Long Terms is Focused Now');
            props.getImmune();
        }, [])
    );
    return (
        <View style={styles.screenContainer}>
             <Text style={{ marginTop: 10, }}>No Records Found</Text>
            {/* <ImmuneHandler
                date={'25 May'}
                month={'2020'}
                type_diagnoes={'item.resource.resourceType'}
                indication={'item.resource.note[0].text'}
                vacc={'item.resource.note[0].text'}
                datedue={'Due Date: 14 May 2020' }
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center', alignItems: 'center'

    },
});

function mapStateToProps(state) {
    return {
        Immune: state.Immune
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getImmune: () => dispatch(fetchImmunefromApi(pageSize, pageNumber))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Due)
//export default Due;
