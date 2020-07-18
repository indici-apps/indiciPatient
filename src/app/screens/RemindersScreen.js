import React, { memo } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import Colors from '../../shared/constants/Colors'

import ReminderHandler from "../components/ReminderHandler";
import Svg, { Defs, Pattern, LinearGradient, Stop } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { } from 'react-native-svg';
import { Image as SvgImage } from 'react-native-svg';

const DATA = [
    {
        "id": "71e2e2191ea21714152a2bfc346b5aa814b73a05ec506b341401efc4999aaaab",
        "rem_type": "report",
        "rem_date": "5/25/2020",
        "rem_content": "You have received a new report"
    },
    {
        "id": "231c5aed081e2b95f937411410477d0a9e53723fee19bca2441337ddc45c82a7",
        "rem_type": "app",
        "rem_date": "5/24/2020",
        "rem_content": "You have new appointment due 1st June 2020"
    },
    {
        "id": "2f59829b3962e4fae6ff2016854e2b5fca9644a9cce72bd458a67459dba7a67f",
        "rem_type": "bal",
        "rem_date": "5/24/2020",
        "rem_content": "You have a pending balance of $25"
    },
    {
        "id": "bc07e148958f011dc652098d695bf0ee71a9eba3b848ebe95e865efdf1dfdc49",
        "rem_type": "app",
        "rem_date": "5/23/2020",
        "rem_content": "You have new appointment due 31st May 2020"
    },
    {
        "id": "f2bd66eeee82d83f7fa85e4f4f09f0e4a2efc0326642eb126f81c259ab6dd18d",
        "rem_type": "report",
        "rem_date": "5/23/2020",
        "rem_content": "You have received a new report"
    },
    {
        "id": "f0bda1a55c6699b053cddda1b66b2d9063366839b2e5ab995071ee100bec31cb",
        "rem_type": "app",
        "rem_date": "5/22/2020",
        "rem_content": "Your appontment was cancelled"
    },
    {
        "id": "e1081c477d553fd706b4652d01895ecdbd2105a10e188ce6176fe1e60e891c82",
        "rem_type": "app",
        "rem_date": "5/21/2020",
        "rem_content": "You have missed an appointment"
    },
    {
        "id": "2f59829b3962e4fae6ff2016854e2b5fca9644a9cce72bd458a632ddsba7a67f",
        "rem_type": "bal",
        "rem_date": "5/20/2020",
        "rem_content": "You have a pending balance of $10"
    },
]


function dateToHowManyAgo(stringDate) {
    var currDate = new Date();
    var diffMs = currDate.getTime() - new Date(stringDate).getTime();
    var sec = diffMs / 1000;
    if (sec < 60)
        return parseInt(sec) + ' second' + (parseInt(sec) > 1 ? 's' : '') + ' ago';
    var min = sec / 60;
    if (min < 60)
        return parseInt(min) + ' minute' + (parseInt(min) > 1 ? 's' : '') + ' ago';
    var h = min / 60;
    if (h < 24)
        return parseInt(h) + ' hour' + (parseInt(h) > 1 ? 's' : '') + ' ago';
    var d = h / 24;
    if (d < 30)
        return parseInt(d) + ' day' + (parseInt(d) > 1 ? 's' : '') + ' ago';
    var m = d / 30;
    if (m < 12)
        return parseInt(m) + ' month' + (parseInt(m) > 1 ? 's' : '') + ' ago';
    var y = m / 12;
    return parseInt(y) + ' year' + (parseInt(y) > 1 ? 's' : '') + ' ago';
}

function returnIconType(reminderType) {
    if (reminderType === 'report') {
        return <Svg height={35} viewBox="0 0 64 64" width={35} fill="#fff" fillRule="nonzero">
            <SvgPath d="M46 32a4 4 0 01-4-4h-2a6 6 0 0012 0h-2a4 4 0 01-4 4z" />
            <SvgPath d="M53 36h-.1A12.987 12.987 0 0059 25v-5h1a1 1 0 001-1v-2a14.98 14.98 0 00-26.97-9H3a1 1 0 00-1 1v52a1 1 0 001 1h58a1 1 0 001-1V45a9.014 9.014 0 00-9-9zm0 9v2h-2v-2zM33 17a13 13 0 0126 0v1h-.59l-3.95-3.96a4.981 4.981 0 00-5.12-1.21L33.84 18H33zm-2.94 27a8.262 8.262 0 00-.06 1v3H20v2h10v4H20v2h10v4H4V10h28.74A14.873 14.873 0 0031 17v2a1 1 0 001 1h1v5a12.987 12.987 0 006.1 11H39a8.991 8.991 0 00-8.47 6H20v2zM45 60H32V45a7 7 0 016-6.92V47h-2a1 1 0 00-1 1v6h2v-5h4v5h2v-6a1 1 0 00-1-1h-2v-9h5zM35 25v-5.28l14.97-4.99a2.985 2.985 0 013.07.73L57 19.41V25a11 11 0 01-22 0zm25 35H47V38h4v5h-1a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-1v-5a7.008 7.008 0 017 7z" />
            <SvgPath d="M40 20h2v4h-2zM50 20h2v4h-2zM28 18h-3v-3a1 1 0 00-1-1h-4a1 1 0 00-1 1v3h-3a1 1 0 00-1 1v4a1 1 0 001 1h3v3a1 1 0 001 1h4a1 1 0 001-1v-3h3a1 1 0 001-1v-4a1 1 0 00-1-1zm-1 4h-3a1 1 0 00-1 1v3h-2v-3a1 1 0 00-1-1h-3v-2h3a1 1 0 001-1v-3h2v3a1 1 0 001 1h3zM9 18a3.009 3.009 0 00-3 3v31a1.185 1.185 0 00.05.32l2 6a1 1 0 001.9 0l2-6A1.185 1.185 0 0012 52V21a3.009 3.009 0 00-3-3zm0 36.84L8.39 53h1.22zM10 51H8V21a1 1 0 012 0zM14 30h4v2h-4zM20 30h11v2H20zM14 36h4v2h-4zM20 36h11v2H20zM14 42h4v2h-4zM14 48h4v2h-4zM14 54h4v2h-4z" />
        </Svg>
    }

    if (reminderType === 'bal') {
        return <Svg height={35} viewBox="0 0 480.013 480.013" width={35} fill="#fff" fillRule="nonzero">
            <SvgPath d="M238.068 322.013c0 57.897 47.103 105 105 105s105-47.103 105-105c0-37.745-20.022-70.896-50-89.406V101.013a7.982 7.982 0 00-3.19-6.382C295.481-4.766 301.912.843 298.511.169 297.322-.067 309.877.013 63.945.013c-17.645 0-32 14.355-32 32v416c0 17.645 14.355 32 32 32h302c17.645 0 32-14.355 32-32a8 8 0 00-16 0c0 8.822-7.178 16-16 16h-302c-8.822 0-16-7.178-16-16v-416c0-8.822 7.178-16 16-16h225v61c0 17.645 14.355 32 32 32h61.123v115.515c-13.043-5.236-27.215-7.882-42-7.469v-57.045c0-13.233-10.767-24-24-24h-202c-13.234 0-24 10.767-24 24v102c0 13.233 10.766 24 24 24h105a8 8 0 000-16h-36v-51h72a8 8 0 008-8v-59h53c4.411 0 8 3.589 8 8v58.727c-48.858 8.966-86 51.861-86 103.272zm82.877-229c-8.822 0-16-7.178-16-16V27.327l65.687 65.687h-49.687zm-206.877 59h53v51h-61v-43c0-4.411 3.589-8 8-8zm53 118h-53c-4.411 0-8-3.589-8-8v-43h61zm80-67h-64v-51h64zm185 119c0 49.075-39.925 89-89 89s-89-39.925-89-89 39.925-89 89-89 89 39.925 89 89zm-81 20v-3.237a7.966 7.966 0 00-5.614-7.636l-9.544-2.982c-10.074-3.148-16.842-12.354-16.842-22.907v-3.237c0-10.429 6.689-19.321 16-22.624v-3.376a8 8 0 0116 0v3.376c9.311 3.303 16 12.195 16 22.624a8 8 0 01-16 0c0-4.411-3.589-8-8-8s-8 3.589-8 8v3.237a7.966 7.966 0 005.614 7.636l9.544 2.982c10.074 3.148 16.842 12.354 16.842 22.907v3.237c0 11.519-8.159 21.165-19 23.472v2.528a8 8 0 01-16 0v-4.68c-7.713-3.996-13-12.05-13-21.32a8 8 0 0116 0c0 4.411 3.589 8 8 8s8-3.589 8-8zm-261-12a8 8 0 018-8h78a8 8 0 010 16h-78a8 8 0 01-8-8zm0 60a8 8 0 018-8h98a8 8 0 010 16h-98a8 8 0 01-8-8z" />
        </Svg>
    }

    if (reminderType === 'app') {
        return <Svg height={35} viewBox="0 0 60 60" width={35} fill="#fff" fillRule="nonzero" >
            <SvgPath d="M57 6h-2a3 3 0 00-3-3h-4a3 3 0 00-6 0h-4a3 3 0 00-6 0h-4a3 3 0 00-6 0h-4a3 3 0 00-6 0H8a3 3 0 00-3 3H3a3 3 0 00-3 3v48a3 3 0 003 3h54a3 3 0 003-3V9a3 3 0 00-3-3zM7 49.816c.32.118.659.18 1 .184h44c.341-.003.68-.066 1-.184V52a1 1 0 01-1 1H8a1 1 0 01-1-1zM52 48H8a1 1 0 01-1-1V13h46v34a1 1 0 01-1 1zM44 3a1 1 0 012 0v3a1 1 0 01-2 0zM34 3a1 1 0 012 0v3a1 1 0 01-2 0zM24 3a1 1 0 012 0v3a1 1 0 01-2 0zM14 3a1 1 0 012 0v3a1 1 0 01-2 0zM8 5h4v1a3 3 0 006 0V5h4v1a3 3 0 006 0V5h4v1a3 3 0 006 0V5h4v1a3 3 0 006 0V5h4a1 1 0 011 1v5H7V6a1 1 0 011-1zm50 52a1 1 0 01-1 1H3a1 1 0 01-1-1V9a1 1 0 011-1h2v44a3 3 0 003 3h44a3 3 0 003-3V8h2a1 1 0 011 1z" />
            <SvgPath d="M47 16h-1a1 1 0 000 2h1v5a3 3 0 01-6 0v-5h1a1 1 0 000-2h-1a2 2 0 00-2 2v5a5.009 5.009 0 004 4.9V30c0 7.18-5.82 13-13 13s-13-5.82-13-13c.004-1.762.37-3.504 1.076-5.118a4.028 4.028 0 10-1.767-.942A14.855 14.855 0 0015 30c0 8.284 6.716 15 15 15s15-6.716 15-15v-2.1a5.009 5.009 0 004-4.9v-5a2 2 0 00-2-2zm-28 3a2 2 0 110 4 2 2 0 010-4z" />
            <SvgPath d="M27.293 35.707A1 1 0 0028 36a.844.844 0 00.087 0 1 1 0 00.732-.423l7-10a1 1 0 00-1.638-1.146l-6.317 9.019-2.157-2.157a1 1 0 00-1.414 1.414z" />
        </Svg>
    }
}

function returnColorType(reminderType) {
    if (reminderType === 'report') {
        return { backgroundColor: Colors.highAllergy }
    }

    if (reminderType === 'bal') {
        return { backgroundColor: Colors.lowAllergy }
    }

    if (reminderType === 'app') {
        return { backgroundColor: Colors.midAllergy }
    }
}


const RemindersScreen = props => {
    return (
        <View style={styles.screenContainer}>
            {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
            {/* <ReminderHandler remiderImage={returnIconType('bal')} styles={{ backgroundColor: 'red' }} /> */}

            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <ReminderHandler
                        styles={returnColorType(item.rem_type)}
                        remiderImage={returnIconType(item.rem_type)}
                        remText={item.rem_content}
                        remDate={dateToHowManyAgo(item.rem_date)}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};
const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.defaultBackground,

    },


});
export default RemindersScreen;
