import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Normaize } from "../../shared/core/Normaize";

const AllergiesHandler = props => (
    <View style={styles.allergies_group1537}>
        <View style={styles.listItems}>
            <View style={[styles.circleColumn, props.styles || {}]} >
                <Text style={styles.circleColumnItems}>{props.algLevel}</Text>
            </View>
            <View style={styles.detailsView}>
                <View style={styles.detailsViewList}>
                    <Text style={styles.algTile}>{props.algTitle}</Text>
                    <View style={{ marginTop: 5 }}></View>
                    <Text><Text style={styles.algOptions}>Type:</Text> <Text style={styles.algOptionsDetails}>{props.algType}</Text></Text>
                    <View style={{ marginTop: 5 }}></View>
                    <Text><Text style={styles.algOptions}>Symptoms:</Text> <Text style={styles.algOptionsDetails}>{props.symptoms}</Text></Text>
                    <View style={{ marginTop: 5 }}></View>
                    <Text><Text style={styles.algOptions}>Comments:</Text> <Text style={styles.algOptionsDetails}>{props.comment}</Text></Text>
                </View>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    listItems: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#D1D1D6',
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    circleColumn: {
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    circleColumnItems: {
        color: '#fff',
        fontSize: Normaize(14),
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
        fontSize: Normaize(14),

    },
    algOptions: {
        fontWeight: 'bold',
        fontSize: Normaize(14),
    },
    algOptionsDetails: {
        fontSize: Normaize(14),
    }
});

export default AllergiesHandler;