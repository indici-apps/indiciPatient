import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image, Platform } from 'react-native';
import * as WebBroswer from 'expo-web-browser';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TermsConditionScreen = props => {

    return (
        <View style={styles.termsScreen}>
            <View style={[{ flexDirection: 'column' }, styles.elementsContainer]}>

                <View>

                    <Text style={styles.welcomeText}>Welcome To</Text>
                    <Image
                        style={styles.brandLogo}
                        source={require('../../assets/brand_logo.png')} />

                </View>


                <View style={{justifyContent: 'center' , alignItems:'center'}}>
                    <View style={styles.termsStyle}>
                        <TouchableOpacity onPress={() => WebBroswer.openBrowserAsync('http://google.com/')}>
                            <Text style={styles.mainText}>Tap "Agree & Continue" to accept the Indici</Text>
                            <Text style={styles.underlinedText}> Terms of Services and Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.imagePosition}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                            <Image style={styles.getStartedBtn}
                                source={require('../../assets/getStarted.png')} />
                        </TouchableOpacity>
                    </View>
                </View>



            </View>
        </View>
    );
};
const styles = StyleSheet.create({

    termsScreen: {
        marginTop: 0,
        flex: 1,
        backgroundColor: '#fff',
    },

    elementsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: '20%',
      //  marginLeft: 24,
      //  marginRight: 24,
        justifyContent: "space-between",
        alignItems: "center"
    },

    welcomeText: {
        textAlign: "center",
       // marginTop: 0,
        fontSize: hp('5%'),
        color: "#455E77"
    },

    brandLogo: {
        width: wp('70%'),
        height: hp('15%'),
        // marginTop: wp('15%')
    },
    termsStyle: {
        flexDirection: 'column',
        padding: 10,
        marginVertical: 10
    },
    mainText: {
        fontSize: Platform.OS === 'ios' ? 16 : 15,
        textAlign: "center",
        color: "#70798F"
    },
    underlinedText: {
        fontSize: hp('2.5%'),
        //fontSize: Platform.OS === 'ios' ? 16 : 15,
        textAlign: "center",
        textDecorationLine: "underline",
        color: "#455E77"
    },

    imagePosition: {

    },
    getStartedBtn: {
        //width: 200,
        //height: 48,
        width: wp('50%'),
        height: hp('8%'),
        borderRadius: 30,
        marginBottom: 0,
        justifyContent: 'flex-end'
    }
});


export default TermsConditionScreen;