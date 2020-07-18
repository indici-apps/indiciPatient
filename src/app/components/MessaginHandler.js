import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Normaize } from "../../shared/core/Normaize";

// const getRandomColor = () => {
//     console.log('called');
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return { backgroundColor: color }
// }


const MessaginHandler = props => (
    <View style={styles.listItems}>
        <View style={[styles.circleColumn, props.styles || {}]} >
            <Text style={styles.circleColumnItemsDate}>{props.initails}</Text>
        </View>
        <View style={styles.detailsView}>
            <View style={styles.detailsViewList}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.algTile}>{props.senderName}</Text>
                    <Text style={{ color: '#70798F', fontSize: Normaize(12) }}>{props.sentDate}</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: Normaize(12), color: '#70798F' }}>{props.subject}</Text>
                    <Text style={{ fontSize: Normaize(12), color: '#70798F' }} numberOfLines={1} ellipsizeMode='tail'>{props.msgtext}</Text>
                </View>


            </View>
        </View>
    </View>
);

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
        alignItems: 'center',

    },
    circleColumn: {
        width: 45,
        height: 45,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E81F1F',
        marginLeft: 10
    },
    circleColumnItemsDate: {
        fontSize: Normaize(18),
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
        fontSize: Normaize(14),
        fontWeight: "bold",
        color: '#455E77'
    },
    algOptions: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#70798F'

    }
});

export default MessaginHandler;