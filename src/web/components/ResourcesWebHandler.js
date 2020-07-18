import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Dimensions } from 'react-native';
import Colors from "../../shared/constants/Colors";


const ResourcesWebHandler = props => {

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

        <TouchableOpacity style={{ width: isLargeScreen ? '48%' : '92%' }}>
            <View style={styles.reoprtsListStyle}>
                <View style={[styles.circleColumn, props.styles || {}]} >
                    <Text style={styles.circleColumnItemsDate}>{props.rptDate}</Text>
                    <Text style={styles.circleColumnItemsMonth}>{props.rptYear}</Text>
                </View>

                <View style={{ flex: 15 }}>
                    <View style={styles.resultsScreen_group4263}>
                        <Text style={styles.resultsScreen_group4263_notifications6f309c1d}>{props.name}</Text>
                        <Text style={styles.resultsScreen_group4263_notifications}>{props.reportdetails}</Text>
                    </View>
                </View>
                <View style={{ flex: 3, marginRight: 10, }}>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/pdf2.png')} style={styles.resultsScreen_icpdf} />
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    reoprtsListStyle: {
        flexDirection: 'row',
        borderColor: '#D1D1D6',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        marginTop: 8,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        borderWidth: 0,
    },
    resultsScreen_icpdf: {
        width: 30,
        height: 30,
        marginLeft: 10
    },
    resultsScreen_group4263: {
        opacity: 1,
        backgroundColor: "transparent",
        marginLeft: 20
    },
    resultsScreen_rectangle3820: {
        opacity: 1,
        backgroundColor: "rgba(0, 161, 222, 1)",
        borderRadius: 5,
        width: 80,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30
    },
    resultsScreen_view: {
        opacity: 1,
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0)",
        color: "rgba(255, 255, 255, 1)",
        fontSize: 16,
        fontWeight: "600",
        fontStyle: "normal",
    },
    "resultsScreen_group4263_notifications6f309c1d": {
        "opacity": 1,
        width: 250,
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(0, 0, 0, 1)",
        fontSize: 14,
        "fontWeight": "400",
        "fontStyle": "normal",
    },

    "resultsScreen_group4263_notifications": {
        "opacity": 1,
        "color": "#636363",
        "fontSize": 15,
        "fontWeight": "400",
        "fontStyle": "normal",
        "textAlign": "left",
    },

    circleColumn: {
        width: 50,
        height: 60,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lowAllergy,
        marginLeft: 10
    },
    circleColumnItemsDate: {
        fontSize: 14,
        color: '#fff',

    },
    circleColumnItemsMonth: {
        fontSize: 14,
        color: '#fff',

    },
});

export default ResourcesWebHandler;