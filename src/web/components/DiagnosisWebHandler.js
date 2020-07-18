import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const DiagnosisWebHandler = props => {
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
                <Text style={styles.circleColumnItemsDate}>{props.date}</Text>
                <Text style={styles.circleColumnItemsMonth}>{props.month}</Text>
            </View>
            <View style={styles.detailsView}>
                <View style={styles.detailsViewList}>
                    <Text style={styles.algTile}>{props.type_diagnoes}</Text>
                    <Text>{props.comments}</Text>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    listItems: {
        flexDirection: 'row',
        marginTop: 8,
        borderRadius: 10,
        borderWidth: 0,
        borderColor: '#D1D1D6',
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    circleColumn: {
        width: 55,
        height: 65,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E81F1F',
        marginLeft: 10
    },
    circleColumnItemsDate: {
        fontSize: 15,
        color: '#fff'
    },
    circleColumnItemsMonth: {
        fontSize: 15,
        color: '#fff'
    },
    detailsView: {
        flex: 2,
        marginLeft: 20,
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

export default React.memo(DiagnosisWebHandler);