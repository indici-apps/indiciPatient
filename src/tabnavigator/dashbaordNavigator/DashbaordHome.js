import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar';
import DashbaordOptions from '../../components/UI/DashbaordOptions';
import DashboardUserinfo from '../../components/UI/DashboardUserinfo';
import { AuthContext } from '../../core/context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const DashboardHome = props => {
    const { signOut } = React.useContext(AuthContext);
    return (

        <View style={styles.mainLoginContainer}>
            <CustomStatusBar style={{ backgroundColor: 'white' }} />
            <View style={styles.dashboard_content}>
                <View style={styles.dashboard_content_photo}>
                    <Image source={require('../../assets/photoe687d399.png')} style={styles.profile_pic} />
                </View>

                <View style={styles.dashboard_content_bg7b6a30dc}></View>

            </View>
            <DashboardUserinfo btnText="Logout" logout={() => signOut()} />
            <DashbaordOptions
                navigateAllergy={() => props.navigation.navigate('Appnav')}
                navigateReports={() => props.navigation.navigate('Results')}
                getAllergies={() => props.navigation.navigate('Allergies')}
                getDiag={() => props.navigation.navigate('Diagnosis')}
                getMed={() => props.navigation.navigate('Medications')}
                getTimeline={() => props.navigation.navigate('Timeline')}
                getReminders={() => props.navigation.navigate('Reminders')}
                getAccounts={() => props.navigation.navigate('Accounts')}
                userProfile={() => props.navigation.navigate('Profile')}
                getScanner={() => props.navigation.navigate('Scanner')}
                getVitals={() => props.navigation.navigate('Vitals')} />
        </View>

    );
};
const styles = StyleSheet.create({

    mainLoginContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-evenly'
        // marginTop: Platform.OS === 'ios' ? 20:0

    },

    dashboard_content_bg7b6a30dc: {
        backgroundColor: '#eef2f3',
        opacity: 1,
        position: "absolute",
        marginTop: 110,
        borderRadius: 20,
        width: wp('100%'),
        height: hp('20%'),
        left: 0,
    },

    dashboard_content: {
        opacity: 1,
        position: "relative",
        backgroundColor: "transparent",
        width: wp('100%'),
    },
    profile_pic: {
        resizeMode: 'cover',
        height: 130,
        width: '100%'
    },
    dashboard_content_photo: {
        width: wp('100%'),
        height: hp('20%'),
        position: "relative",
        backgroundColor: "rgba(0, 0, 0, 0.23921568627450981)",
        opacity: 1
    },

});
export default DashboardHome;