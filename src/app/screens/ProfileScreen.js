import React, { memo, useState, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import DashboardUserinfo from '../components/UI/DashboardUserinfo';
import ProfileInfoList from "../components/ProfileInfoList";
import StatusBarType from "../components/StatusBarType";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fetchProfileFromApi } from  '../../shared/actions/ProfileActions'; 
const screenHeight = Dimensions.get('window').height;


function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

const ProfileScreen = props => {
    const { Profile, isFetching } = props.Profile;
    const [modalVisible, setModalVisible] = useState(false);


    useFocusEffect(
        useCallback(() => {
            //console.log(getUserId())
            props.getProfile();
        }, [])
    );
    return (
        <ScrollView style={styles.mainProfContainer}>
            <StatusBarType />
            <View style={styles.dashboard_content}>
                <View style={styles.dashboard_content_photo}>
                    <Image source={require('../../assets/photoe687d399.png')} style={styles.profile_pic} />
                </View>
                <View style={styles.dashboard_content_bg7b6a30dc}></View>
            </View>
            <View>
                {/* <DashboardUserinfo btnText="Update Profile" logout={() => setModalVisible(!modalVisible)} /> */}
                {
                    Profile.map((person, i) => {
                        return <DashboardUserinfo key={i} fullname={person.resource.name[i].text} familyName={'Preferred Name:' + person.resource.name[i].family} nhi={'NHI: (Not Available) '} btnText="Update Profile" logout={() => setModalVisible(!modalVisible)} />
                    })
                }
            </View>




            {
                Profile.map((person, i) => {
                    return <View style={styles.profileDetailHeader} key={i}>
                        <ProfileInfoList title="Mobile Number" profileData={person.resource.telecom[0].value} />
                        <ProfileInfoList title="Home Phone" profileData={person.resource.telecom[1].value} />
                        <ProfileInfoList title="Work Phone" profileData={person.resource.telecom[2].value} />
                        <ProfileInfoList title="Email" profileData={person.resource.telecom[3].value} />
                        <ProfileInfoList title="Gender" profileData={capitalize(person.resource.gender)} />
                        <ProfileInfoList title="Date of Birth" profileData={person.resource.birthDate} />
                        <ProfileInfoList title="Blood Group" profileData="(Not Available)" />
                        <ProfileInfoList title="Permanent Address" profileData="(Not Available)" />
                        <ProfileInfoList title="Postal Address" profileData="(Not Available)" />
                    </View>
                })
            }





            <Modal
                presentationStyle="overFullScreen"
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={styles.profileDetailHeader}>
                            <ProfileInfoList title="Mobile Number" profileData="+64 211 234226" />
                            <ProfileInfoList title="Home Phone" profileData="+64 211 234226" />
                            <ProfileInfoList title="Work Phone" profileData="+64 211 451245" />
                            <ProfileInfoList title="Email" profileData="maria_snow@gmail.com" />
                            <ProfileInfoList title="Gender" profileData="Female" />
                            <ProfileInfoList title="Date of Birth" profileData="12 Jan 1983" />
                            <ProfileInfoList title="Blood Group" profileData="O +ve" />
                            <ProfileInfoList title="Permanent Address" profileData="13B Arthur Street, Whitianga" />
                            <ProfileInfoList title="Postal Address" profileData="14D Black Rock Way, Paeroa" />
                        </View>

                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#2196F3", marginTop: 10, width: 150 }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Update Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    mainLoginContainer: {
        flex: 1,
        flexDirection: "column",
        // marginTop: Platform.OS === 'ios' ? 20:0

    },
    dashboard_content: {
        opacity: 1,
        position: "relative",
        backgroundColor: "transparent",
        width: '100%'
    },
    dashboard_content_photo: {
        width: '100%',
        height: 130,
        position: "relative",
        backgroundColor: "rgba(0, 0, 0, 0.23921568627450981)",
        opacity: 1
    },
    profile_pic: {
        resizeMode: 'cover',
        height: 130,
        width: '100%'
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

    profileDetailHeader: {
        width: '100%',
        backgroundColor: '#fff',
        paddingBottom: 0,
        paddingTop: 0,
        marginTop: 22,
        borderTopWidth: 1,
        borderTopColor: '#E2E2E2',
        height: "auto",
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

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
)(ProfileScreen)
//export default memo(ProfileScreen);