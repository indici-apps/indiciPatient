import React, { useCallback } from 'react';
import {
    StyleSheet,
    Text, View,
    FlatList,
} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";


import MedicationHandler from '../../components/MedicationHandler';
import { fetchMedsFromApi } from "../../../shared/actions/MedicationActions";
import { GetAppointmentDate, GetMonthName, GetYear } from '../../../shared/core/datehelper'
import Colors from '../../../shared/constants/Colors';

let token = '';
const DATA = [{
    "id": "f269a1c0c83303c78b6774d0e151a687291f9fa9993de5ee9b550bc823e8bb3e",
    "durg_name": "Prevacid",
    "durg_name_b": "healthy accents tussin dm",
    "date": "2/3/2020"
}, {
    "id": "9eae900c6552c0d0e123b903203171e0cd42c90af56e23e9e3fbf6dc29d82b6b",
    "durg_name": "miconazole 1",
    "durg_name_b": "Thai Herbal Balm Lemon Grass",
    "date": "4/29/2020"
}, {
    "id": "0fcc57bfa8b605cf4db78bca02aa555a2631e676e0445631be236b339d3e6eca",
    "durg_name": "Antibacterial Spray",
    "durg_name_b": "Tramadol Hydrochloride and Acetaminophen",
    "date": "1/12/2020"
}, {
    "id": "fba7fb5422b56d9b27160b61afbebf4072223e82dbf3be5804bff0d829c220bc",
    "durg_name": "Fungicure",
    "durg_name_b": "Kids Eczema Balm",
    "date": "3/8/2020"
}, {
    "id": "4722b828a7e0f7481ad88427b5e0c992272dc0d336c8f2935b88cb2f86c55d13",
    "durg_name": "FLULAVAL",
    "durg_name_b": "Gold Bond Ultimate Healing Concentrated Therapy",
    "date": "3/12/2020"
}, {
    "id": "d3ad6e6fdf6d605a6cc48f00f21ca49e00e90e85fc5ba9b400f0e122901d56d6",
    "durg_name": "ibuprofen",
    "durg_name_b": "Lasix",
    "date": "8/29/2019"
}, {
    "id": "b215e091fc30bce10af18062d66f9560979a987b7be737ae4a50a1425d31c474",
    "durg_name": "Naproxen Sodium",
    "durg_name_b": "Hydrophor",
    "date": "12/8/2019"
}, {
    "id": "6c08c3baea3de3b53632fd94000796e4e774713b44e0693498ca8651eab77fc8",
    "durg_name": "TERPENICOL",
    "durg_name_b": "GLUCOPHAGE",
    "date": "2/24/2020"
}, {
    "id": "8b5e6897d140832825258f3883ffbbd4062043b6bdf853d8134eb1a6b23b384e",
    "durg_name": "Penicillin V Potassium",
    "durg_name_b": "FLOVENT",
    "date": "7/20/2019"
}, {
    "id": "050b7548094db017be76e7d15bd701582ee76f5aaca4eb52fa9a0f54be393ed3",
    "durg_name": "ACITRETIN",
    "durg_name_b": "CALCID",
    "date": "2/24/2020"
}];


let pageNumber = 1;
let pageSize = 100;


function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
const LongMed = props => {

    const { Medication, isGetting } = props.Medication;
    useFocusEffect(
        useCallback(() => {
            props.getMed();
        }, [])
    );

    //check long terms meds
    function CheckLongTerm(props) {
        const results = props.results;
        if (results.resource.extension[0].valueBoolean == true) {
            return <MedicationHandler
                medDate={GetAppointmentDate(results.resource.hasOwnProperty('effectivePeriod') ? results.resource.effectivePeriod.start : null) + ' ' + GetMonthName(results.resource.hasOwnProperty('effectivePeriod') ? results.resource.effectivePeriod.start : null)}
                medMonth={GetYear(results.resource.hasOwnProperty('effectivePeriod') ? results.resource.effectivePeriod.start : null)}
                medicationDetails={capitalize(results.resource.medicationCodeableConcept.coding[0].display)}
                directions={results.resource.dosage.text}
                checking={results.resource.extension[1].valueString === "" ? ('(Not Available)') : (results.resource.extension[1].valueString)}
                quantity={results.resource.dosage.dose.value + ' ' + results.resource.dosage.dose.unit}
                presby={results.resource.extension[2].valueString}
                pratname={results.resource.extension[3].valueString}
            />
        } else {
            return null
        }
    }
    return (
        <View style={styles.screenContainer}>
            {/* <MedicationHandler /> */}
            {
                isGetting && <Text style={{ textAlign: 'center', marginTop: 5 }}> Refreshing...</Text>
            }
            {
                <FlatList
                    style={{ marginTop: 10 }}
                    data={Medication}
                    renderItem={({ item }) => (
                        <CheckLongTerm results={item} />
                    )}
                    keyExtractor={item => item.resource.id}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                    }}
                />
            }

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
        Medication: state.Medication
    }
}

function mapDispatchToProps(disptach) {
    return {
        getMed: () => disptach(fetchMedsFromApi(token, pageSize, pageNumber))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LongMed)
// export default LongMed;