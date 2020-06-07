import React, { memo, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import DashboardUserinfo from '../components/UI/DashboardUserinfo';
import ProfileInfoList from "../components/ProfileInfoList";
import StatusBarType from "../components/StatusBarType";
const screenHeight = Dimensions.get('window').height;

const ProfileScreen = props => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <ScrollView style={styles.mainProfContainer}>
            <StatusBarType/>
            <View style={styles.dashboard_content}>
                <View style={styles.dashboard_content_photo}>
                    <Image source={require('../assets/photoe687d399.png')} style={styles.profile_pic} />
                </View>

            </View>
            <View>
                <DashboardUserinfo btnText="Update Profile" logout={() => setModalVisible(!modalVisible)} />
            </View>



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
                            style={{ ...styles.openButton, backgroundColor: "#2196F3", marginTop: 10 , width: 150}}
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
        height: 150,
        position: "relative",
        backgroundColor: "rgba(0, 0, 0, 0.23921568627450981)",
        opacity: 1
    },
    profile_pic: {
        resizeMode: 'cover',
        height: 150,
        width: '100%'
    },

    dashboard_content_bg7b6a30dc: {
        backgroundColor: '#eef2f3',
        opacity: 1,
        position: "absolute",
        marginTop: 170,
        borderRadius: 20,
        width: '100%',
        height: 480,
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
export default memo(ProfileScreen);