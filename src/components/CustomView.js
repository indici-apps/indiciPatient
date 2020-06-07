import React, { memo, Component } from 'react';
import { View, StyleSheet, Text, TextInput as Input, TouchableOpacity } from 'react-native';
import { Image as ReactImage } from 'react-native';
import Svg, { Defs, Pattern } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { } from 'react-native-svg';
import { Image as SvgImage } from 'react-native-svg';

const CustomView = props => {

    return (
        <View style={styles.dashbaord_first_row}>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity onPress={props.click_a}>
                    {props.svg_a}
                </TouchableOpacity>
                <Text style={styles.headingsFontStyling}>{props.option_a}</Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity  onPress={props.click_b}>
                    {props.svg_b}
                </TouchableOpacity>
                <Text style={styles.headingsFontStyling}>{props.option_b}</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity  onPress={props.click_c}>
                    {props.svg_c}
                </TouchableOpacity>
                <Text style={styles.headingsFontStyling}>{props.option_c}</Text>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    dashbaord_first_row: {
        // flex: 1,
        flexDirection: 'row',
        opacity: 1,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between',
        marginTop: 0
    },
    headingsFontStyling: {
        backgroundColor: "rgba(255, 255, 255, 0)",
        color: "#4D5870",
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 40
    }
});

export default CustomView;