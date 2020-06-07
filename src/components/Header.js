import React, { memo } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import Svg, { Defs, Pattern, LinearGradient, Stop } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { } from 'react-native-svg';
import { Image as SvgImage } from 'react-native-svg';
import CustomStatusBar from './CustomStatusBar';


const Header = props => (

    <View style={styles.headerStyling}>
        <View style={styles.headerRow}>
            <View style={styles.backarrow}>
                <Svg style={styles.backarrow} viewBox="0 0 31.494 31.494" width={50} height={25}  >
                    <SvgPath
                        d="M10.273 5.009a1.112 1.112 0 011.587 0 1.12 1.12 0 010 1.571l-8.047 8.047h26.554c.619 0 1.127.492 1.127 1.111s-.508 1.127-1.127 1.127H3.813l8.047 8.032c.429.444.429 1.159 0 1.587a1.112 1.112 0 01-1.587 0L.321 16.532a1.12 1.12 0 010-1.571l9.952-9.952z"
                        fill="#1e201d"
                    />
                </Svg>
            </View>
            <Text style={styles.headingTitle}> {props.title}</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}></Text>
        </View>
    </View>
    // <View style={styles.headerStyling}>

    //     <View style={styles.headerRow}>

    //         <Text style={styles.headingTitle}> {props.title}</Text>
    //     </View>

    // </View>
);


const styles = StyleSheet.create({
    headerStyling: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backarrow: {
        flex: 1,
    },
    headingTitle: {
        fontSize: 25,
        flex: 3,
        textAlign: 'center',
        fontWeight: '500'
    }
});

export default Header;