import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class DiagnosisPureHandler extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.listItems}>
                <View style={[styles.circleColumn, this.props.styles || {}]} >
                    <Text style={styles.circleColumnItemsDate}>{this.props.date}</Text>
                    <Text style={styles.circleColumnItemsMonth}>{this.props.month}</Text>
                </View>
                <View style={styles.detailsView}>
                    <View style={styles.detailsViewList}>
                        <Text style={styles.algTile}>{this.props.type_diagnoes}</Text>
                        <Text>{this.props.comments}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listItems: {
        flexDirection: 'row',
        marginTop: 0,
        borderBottomWidth: 1,
        borderColor: '#D1D1D6',
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
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

export default DiagnosisPureHandler;