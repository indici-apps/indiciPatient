import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import * as WebBroswer from 'expo-web-browser';

const AllergiesHandler = props => (
    <View style={styles.allergies_group1537}>
        <View style={styles.listItems}>
            <View style={[styles.circleColumn, props.styles || {}]} >
                <Text style={styles.circleColumnItems}>{props.algLevel}</Text>
            </View>
            <View style={styles.detailsView}>
                <View style={styles.detailsViewList}>
                    <Text style={styles.algTile}>{props.algTitle}</Text>
                    <Text><Text style={styles.algOptions}>Type:</Text> <Text>{props.algType}</Text></Text>
                    <Text><Text style={styles.algOptions}>Symptoms:</Text> <Text>{props.symptoms}</Text></Text>
                    <Text><Text style={styles.algOptions}>Comments:</Text> <Text>{props.comment}</Text></Text>
                </View>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    listItems: {
        flexDirection: 'row',
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#D1D1D6',
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    circleColumn: {
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    circleColumnItems: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "600"
    },
    detailsView: {
        flex: 2,
        marginLeft: 10,
        marginRight: 10,
    },
    detailsViewList: {
        flexDirection: 'column',
    },
    algTile: {
        fontSize: 16,
        fontWeight: "bold",
    },
    algOptions: {
        fontWeight: 'bold',
        fontSize: 16,

    }
});

export default AllergiesHandler;