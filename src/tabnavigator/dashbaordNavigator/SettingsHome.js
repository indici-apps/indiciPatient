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
    Picker,
    Switch,
    SafeAreaView
} from 'react-native';

import StatusBarType from "../../components/StatusBarType";

const SettingsHome = props => {
    const [value, setValue] = useState(false);
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBarType />

            <View style={{ backgroundColor: '#00A1DE', width: '100%', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                <Text style={{ color: '#fff', fontSize: 19, fontWeight: 'bold' }}>Notification Settings</Text>
            </View>
            <View style={styles.MainList}>
                <Text style={{ flex: 2.5 }}></Text>
                <Text style={{ flex: 1 }}>Email</Text>
                <Text style={{ flex: 1 }}>SMS</Text>
                <Text style={{ flex: 1 }}>Notfication</Text>
            </View>
            <View style={styles.MainList}>
                <Text style={{ flex: 2.5 }}>Appointment Remider</Text>
                <Switch style={{ flex: 1 }} value={value}
                    onValueChange={v => {
                        setValue(v);
                    }} />
                <Switch style={{ flex: 1 }} />
                <Switch style={{ flex: 1 }} />
            </View>
            <View style={styles.MainList}>
                <Text style={{ flex: 2.5 }}>Test Results</Text>
                <Switch style={{ flex: 1 }} />
                <Switch style={{ flex: 1 }} />
                <Switch style={{ flex: 1 }} />
            </View>
            <View style={styles.MainList}>
                <Text style={{ flex: 2.5 }}>Medication Response</Text>
                <Switch style={{ flex: 1 }} />
                <Switch style={{ flex: 1 }} />
                <Switch style={{ flex: 1 }} />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    MainList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: 0,
        marginRight: 0,
        padding: 5
    }
});
export default SettingsHome;