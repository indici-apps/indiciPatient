import React, { useState, useEffect } from 'react';
import {
    Platform,
    StyleSheet,
    Text, View,
    Button,
    TextInput,
    Image,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
    FlatList
} from 'react-native';

import DiagnosisHandler from '../../components/DiagnosisHandler';
import { GetAppointmentDate, GetMonthName, GetYear } from '../../core/datehelper'
import Colors from '../../constants/Colors'
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


function GetTagColor(allergyLevel) {
    return { backgroundColor: Colors.highAllergy }
}
const LongTermsDiag = props => {
    return (
        <View style={styles.screenContainer}>
            {/* <DiagnosisHandler /> */}
            <FlatList
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
            />

        </View>
    );
};
const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        flexDirection: "column",

    },


});
export default LongTermsDiag;