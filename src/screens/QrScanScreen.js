import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
import StatusBarType from "../components/StatusBarType";
export default function QrScanScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
            style={[styles.mainPage, StyleSheet.absoluteFillObject]}>
             <StatusBarType/>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={[styles.scannerView, StyleSheet.absoluteFillObject]}
            />

            {scanned && (
                <View style={styles.rtBtn}>
                    <TouchableOpacity onPress={() => setScanned(false)}>
                        <View>
                            <Text style={{ color: '#fff' }}>Tap to Scan Again</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mainPage: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center'
    },

    scannerView: {

        width: '100%',
        position: 'absolute'
    },
    rtBtn: {
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: 'red',
        width: '50%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});