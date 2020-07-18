import React, { useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, Platform } from 'react-native';
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";


import ResourcesHandler from '../components/ResourcesHandler'
import { fetchResourcesFromApi } from "../../shared/actions/ResourcesActions";
import { GetAppointmentDate, GetMonthName, GetYear } from '../../shared/core/datehelper'



let token = '';
let pageNumber = 1;
let pageSize = 100;

const DATA = [{
    "id": "686b1afc4ab2be78180cc23480b9222193ac284228d2e8a669d41d0069bdee30",
    "doctor_name": "Joellen",
    "document_type": "Scanned Document",
    "date": "12/3/2019",
    "report_link": "http://dummyimage.com/198x226.png/5fa2dd/ffffff"
}, {
    "id": "2a08802dfcbf164d020e6e58bfb73373555ac19b893b4d385b92e8e4be17f527",
    "doctor_name": "Melessa",
    "document_type": "Scanned Document",
    "date": "9/30/2019",
    "report_link": "http://dummyimage.com/121x231.jpg/cc0000/ffffff"
}, {
    "id": "c37c6ccfe0e655a9c2f02b98e4de6d7213458e4347abb4adee5b0d03447eff13",
    "doctor_name": "Odey",
    "document_type": "Scanned Document",
    "date": "8/18/2019",
    "report_link": "http://dummyimage.com/221x175.png/cc0000/ffffff"
}, {
    "id": "6903b45c07b8038db686f2053f706f8810b803073fe8900800ab8a68560beeb3",
    "doctor_name": "Felipe",
    "document_type": "Scanned Document",
    "date": "7/27/2019",
    "report_link": "http://dummyimage.com/231x115.jpg/ff4444/ffffff"
}, {
    "id": "42771822515c26ff91171351f0201d367e1808a43d50c46a87e9e1282eb09248",
    "doctor_name": "Alison",
    "document_type": "Scanned Document",
    "date": "5/11/2020",
    "report_link": "http://dummyimage.com/203x249.png/ff4444/ffffff"
}, {
    "id": "89b2a58c09a8a554323f2da8668201fcf9d41c715163d714b36d57df75f3eee9",
    "doctor_name": "Alva",
    "document_type": "Scanned Document",
    "date": "2/4/2020",
    "report_link": "http://dummyimage.com/125x202.bmp/dddddd/000000"
}, {
    "id": "c6881259c2cdc0e0e1b860fe8c2de5a4daa761475bd7a5c8a468e869046ea085",
    "doctor_name": "Brice",
    "document_type": "Scanned Document",
    "date": "4/30/2020",
    "report_link": "http://dummyimage.com/247x216.png/cc0000/ffffff"
}, {
    "id": "814e39a606c7b2e8c949b23911e13f553cff3484eb892237e586f8e4beea7eb2",
    "doctor_name": "Webb",
    "document_type": "Scanned Document",
    "date": "10/18/2019",
    "report_link": "http://dummyimage.com/173x245.png/dddddd/000000"
}, {
    "id": "c23cd94e8a5e914c8766e5f52acfc36a04af619e7434196b0c43185d1f4966a8",
    "doctor_name": "Arvie",
    "document_type": "Scanned Document",
    "date": "6/13/2019",
    "report_link": "http://dummyimage.com/144x128.bmp/ff4444/ffffff"
}, {
    "id": "e4d99b6da2a24f91304fda38f46a9a863248e58b56f9ab58ee57e194e56c19a3",
    "doctor_name": "Bari",
    "document_type": "Scanned Document",
    "date": "5/29/2019",
    "report_link": "http://dummyimage.com/244x164.bmp/dddddd/000000"
}, {
    "id": "01c6cf7660a18ecd71fd3129b3423bb58c78e8da705d59c644792f5e29d944d2",
    "doctor_name": "Aindrea",
    "document_type": "Scanned Document",
    "date": "10/25/2019",
    "report_link": "http://dummyimage.com/201x177.bmp/cc0000/ffffff"
}, {
    "id": "5448e2115f502c831697fa3f46045a5418b8e50f0336adb047a3b43fd98e57da",
    "doctor_name": "Ancell",
    "document_type": "Scanned Document",
    "date": "2/20/2020",
    "report_link": "http://dummyimage.com/115x201.png/5fa2dd/ffffff"
}, {
    "id": "181c2d46b729b3c869a92e6feb91b7415ed10dcf64f222e3546eb373043731fe",
    "doctor_name": "Burt",
    "document_type": "Scanned Document",
    "date": "7/7/2019",
    "report_link": "http://dummyimage.com/130x228.png/5fa2dd/ffffff"
}, {
    "id": "cef1fe9f544fd92679c6f94687b9e9e9eb5a0dd2ea5bc2a26a7a3e764bd0c12c",
    "doctor_name": "Marcus",
    "document_type": "Scanned Document",
    "date": "9/2/2019",
    "report_link": "http://dummyimage.com/165x215.bmp/5fa2dd/ffffff"
}, {
    "id": "fb7898fb0fe9b26b641711f1fa49a04ee8145c7993505a59bf74cf2fe389b1d1",
    "doctor_name": "Spence",
    "document_type": "Scanned Document",
    "date": "12/4/2019",
    "report_link": "http://dummyimage.com/208x206.jpg/dddddd/000000"
}];
const ResourcesScreen = props => {
    const { Resources, isGetting } = props.Resources;
    useFocusEffect(
        useCallback(() => {
            props.getResources();
        }, [])
    );
    return (
        <View style={styles.screenContainer}>
            {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
            {/* <ReportsHandler name="haseeb Ahmed" reportdetails="Scanned Document 20th Feb 2020"/> */}
            {
                isGetting && <Text style={{ textAlign: 'center', marginTop: 5 }}> Loading...</Text>
            }
            {
                <FlatList
                    data={Resources}
                    renderItem={({ item }) => (
                        <ResourcesHandler
                            rptDate={GetAppointmentDate(item.resource.occurrenceDateTime) + ' ' + GetMonthName(item.resource.occurrenceDateTime)}
                            rptYear={GetYear(item.resource.occurrenceDateTime)}
                            name={'Resource Name: ' + item.resource.content.title}
                            reportdetails={item.resource.content.hasOwnProperty('contentType') ? 'yes' : 'no'}
                            reportLink={item.resource.content.hasOwnProperty('contentType') ? item.resource.content.data : 'http://google.com/'}
                        />
                    )}
                    keyExtractor={item => item.resource.id}
                />
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
        Resources: state.Resources
    }
}

function mapDispatchToProps(disptach) {
    return {
        getResources: () => disptach(fetchResourcesFromApi(token, pageSize, pageNumber))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourcesScreen)


//export default ResourcesScreen;
