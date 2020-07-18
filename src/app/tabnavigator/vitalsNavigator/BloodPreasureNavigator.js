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
    FlatList,
    Dimensions
} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
const BloodPreasureNavigator = props => {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.chartView}>
                <View style={{ marginBottom: 50, width: 130, alignItems: 'center', justifyContent: 'center', backgroundColor: '#665EFF', height: 30, borderRadius: 15 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Blood Preasure</Text>
                </View>
                <LineChart
                    data={{
                        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                ],
                            },
                        ],

                    }}
                    width={Dimensions.get('window').width - 16} // from react-native
                    height={220}
                    yAxisLabel={''}
                    chartConfig={{

                        backgroundColor: 'red',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 255) => `rgba(102, 94, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />

            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3E3E3'

    },
    chartView: {
        backgroundColor: '#fff',
        height: '90%',
        marginLeft: 5,
        marginRight: 5,

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});
export default BloodPreasureNavigator;