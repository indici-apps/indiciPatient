import React, { memo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
const CustomStatusBar = ({ style }) => (
    <View style={[styles.statusBarBackground, style || {}]}>
    </View>
);

const styles = StyleSheet.create({
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 18 : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
        backgroundColor: "white",
    }

});

export default memo(CustomStatusBar);

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 0 : 0;

// const CustomStatusBar = ({ backgroundColor, ...props }) => (
//     <View style={{ backgroundColor }}>
//         <StatusBar translucent backgroundColor={backgroundColor} {...props} />
//     </View>
// );

// const styles = StyleSheet.create({
//     statusBar: {
//         height: STATUSBAR_HEIGHT,
//     },
//     appBar: {
//         backgroundColor: '#79B45D',
//         height: APPBAR_HEIGHT,
//     },
// });

// export default CustomStatusBar;