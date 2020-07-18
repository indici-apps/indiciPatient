import React, { useCallback } from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';

import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";


import CustomStatusBar from '../../components/CustomStatusBar';
import DashbaordOptions from '../../components/UI/DashbaordOptions';
import DashboardUserinfo from '../../components/UI/DashboardUserinfo';
import { AuthContext } from '../../../shared/core/context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { fetchProfileFromApi } from "../../../shared/actions/ProfileActions";

const DashboardHome = props => {

    const { Profile, isFetching } = props.Profile;
    const { signOut } = React.useContext(AuthContext);


    useFocusEffect(
        useCallback(() => {
            //console.log(getUserId())
            props.getProfile();
        }, [])
    );
    return (

        <View style={styles.mainLoginContainer}>
            <CustomStatusBar style={{ backgroundColor: 'white' }} />
            <View style={styles.dashboard_content}>
                <View style={styles.dashboard_content_photo}>
                    <Image source={require('../../../assets/photoe687d399.png')} style={styles.profile_pic} />
                </View>

                <View style={styles.dashboard_content_bg7b6a30dc}></View>

            </View>
            {/* {
                isFetching &&  <DashboardUserinfo fullname={'Loading...'} familyName={"Preffered Name: Loading..."} nhi={' - '} btnText="Logout" logout={() => signOut()} />
            } */}
            {
                Profile.map((person, i) => {
                   return <DashboardUserinfo key={i} fullname={person.resource.name[i].text} familyName={'Preferred Name:'+ person.resource.name[i].family } nhi={'NHI: (Not Available) '} btnText="Logout" logout={() => signOut()} />
                })
            }

            <DashbaordOptions
                navigateAllergy={() => props.navigation.navigate('Appnav')}
                navigateReports={() => props.navigation.navigate('Results')}
                getAllergies={() => props.navigation.navigate('Allergies')}
                getDiag={() => props.navigation.navigate('Diagnosis')}
                getMed={() => props.navigation.navigate('Medications')}
                getResources={() => props.navigation.navigate('Resources')}
                getTimeline={() => props.navigation.navigate('Timeline')}
                getReminders={() => props.navigation.navigate('Reminders')}
                getAccounts={() => props.navigation.navigate('Accounts')}
                userMessaging={() => props.navigation.navigate('Messaging')}
                getScanner={() => props.navigation.navigate('Immunisation')}
                getVitals={() => props.navigation.navigate('Vitals')} />
        </View>

    );
};
const styles = StyleSheet.create({

    mainLoginContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-evenly'
        // marginTop: Platform.OS === 'ios' ? 20:0  getScanner={() => props.navigation.navigate('Scanner')}

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


function mapStateToProps(state) {
    return {
        Profile: state.Profile
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProfile: () => dispatch(fetchProfileFromApi())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardHome)
//export default DashboardHome;