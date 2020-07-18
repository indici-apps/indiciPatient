import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Normaize } from "../../shared/core/Normaize";

const AllergiesWebHandler = props => {

    const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
    React.useEffect(() => {
        const onDimensionsChange = ({ window }) => {
            setDimensions(window);
        };
        Dimensions.addEventListener('change', onDimensionsChange);

        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    }, []);

    const isLargeScreen = dimensions.width >= 1024;


    return (
        <View style={[styles.listItems, { width: isLargeScreen ? '48%' : '92%' }]}>
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

    );
};


const styles = StyleSheet.create({
    listItems: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#D1D1D6',
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#fff',
        marginTop: 8,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        borderWidth: 0,
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
        fontSize: 14,
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
        fontSize: 14,

    },
    algOptions: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    algOptionsDetails: {
        fontSize: 14,
    }
});

export default React.memo (AllergiesWebHandler);