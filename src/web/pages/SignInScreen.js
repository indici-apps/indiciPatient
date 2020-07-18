import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Dimensions,
    Image,
    ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../../shared/core/context';



import UserInput from "../../app/components/UserInput";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import Users from '../config/users';

//let isLargeScreen = '';
const SignInScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });



    const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
    React.useEffect(() => {
        const onDimensionsChange = ({ window }) => {
            setDimensions(window);
        };
        Dimensions.addEventListener('change', onDimensionsChange);

        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    }, []);

    console.log(dimensions.width)
    const isLargeScreen = dimensions.width >= 813;

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {

        // const foundUser = Users.filter(item => {
        //     return userName == item.username && password == item.password;
        // });

        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }
        else {
            signIn('Haseeb');
        }

        // if (foundUser.length == 0) {
        //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        //         { text: 'Okay' }
        //     ]);
        //     return;
        // }
        //signIn(foundUser);
    }

    return (


        <ImageBackground source={require(isLargeScreen ? '../../assets/new_bg.png' : '../../assets/login_cover.png')} style={styles.loginCover}>
            {
                isLargeScreen && <View style={styles.container}>
                    <StatusBar backgroundColor='#009387' barStyle="light-content" />
                    <Animatable.View style={styles.header}>
                        {/* <Text style={styles.text_header}>Welcome!</Text>
                        <Text >Please Login to continue</Text> */}
                    </Animatable.View>



                    <Animatable.View
                        animation="fadeInRight"
                        style={[{ flex: isLargeScreen ? 1 : 3, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }]}>



                        <Image
                            style={{ width: 300, height: 100, marginBottom: 60 }}
                            source={require('../../assets/brand_logo_trans.png')} />

                        {/* <View style={{flex: 2 , width: '100%', height: 100, backgroundColor: '#0D9DD8', justifyContent: 'center', alignItems: 'center' }}>
                        <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require('../assets/indici_logo.png')}
                            style={{ width: '70%', height: 90 }}
                            resizeMode="contain" />
                    </View> */}

                        {/* <Text style={[styles.text_footer, { color: colors.text }]}>
                        Username
                    </Text> */}



                        <View style={styles.action}>
                            {/* <TextInput
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, { color: colors.text }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    /> */}

                            <UserInput
                                returnKeyType="next"
                                onChangeText={(val) => textInputChange(val)}
                                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                                autoCapitalize="none"

                                textContentType="emailAddress"
                                keyboardType="email-address"
                                placeholder="Enter your email" />
                        </View>
                        {data.isValidUser ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                            </Animatable.View>
                        }


                        {/* <Text style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}>Password</Text> */}

                        <View style={styles.action}>
                            <UserInput
                                placeholder="Your Password"
                                returnKeyType="next"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                autoCapitalize="none"
                                onChangeText={(val) => handlePasswordChange(val)}
                            />
                            <TouchableOpacity onPress={updateSecureTextEntry}></TouchableOpacity>
                        </View>
                        {data.isValidPassword ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                            </Animatable.View>
                        }


                        <TouchableOpacity>
                            <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                        </TouchableOpacity>

                        <View style={styles.button}>
                            <TouchableOpacity style={styles.signIn}
                                onPress={() => { loginHandle(data.username, data.password) }}>
                                <View style={styles.signIn} >
                                    <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                    {/* <View style={{ backgroundColor: '#0074B7', width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Version 0.4.7.5</Text>
                <Text>© Copyrights . All rights Reserved </Text>
            </View> */}
                </View>
            }
            {
                !isLargeScreen && <View style={styles.mainLoginContainer}>
                    <View style={styles.centerContainer}>
                        <Text style={styles.welcomeText}>Login Now</Text>
                        <Text style={styles.loginMessage}>Please Login to Continue using our App</Text>

                        <Image
                            style={styles.brandLogo}
                            source={require('../../assets/brand_logo_trans.png')} />


                        <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>

                            <UserInput
                                returnKeyType="next"
                                onChangeText={(val) => textInputChange(val)}
                                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                                autoCapitalize="none"
                                textContentType="emailAddress"
                                keyboardType="email-address"
                                placeholder="Enter your email" />

                            <UserInput
                                placeholder="Your Password"
                                returnKeyType="next"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                autoCapitalize="none"
                                onChangeText={(val) => handlePasswordChange(val)}
                            />
                        </View>

                        <View style={styles.loginMenu}>
                            <Text style={{ color: '#fff' }}></Text>
                            <TouchableOpacity><Text style={{ color: '#fff', fontSize: hp('2.5%') }}>Forget Password?</Text></TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 40 }}>
                            <View style={styles.button}>
                                <TouchableOpacity style={styles.signIn}
                                    onPress={() => { loginHandle(data.username, data.password) }}>
                                    <View style={styles.signIn} >
                                        <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.centerContainer} >
                        <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => props.navigation.navigate('LoginHelp')}>
                            <Text style={styles.mainText}>If you are not able to login click here for help.</Text>
                            <Text style={styles.mainText}>OR Call your practice for further assistance.</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            }

        </ImageBackground>

    );
};

export default SignInScreen;

const styles = StyleSheet.create({


    loginCover: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row-reverse'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    logo: {
        width: '90%',
        height: 250
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        //borderBottomWidth: 1,
        //borderBottomColor: '#f2f2f2',
        paddingBottom: 0,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        width: '90%',
        height: 35,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 35,
        paddingBottom: 30
    },
    signIn: {
        backgroundColor: '#0D9DD8',
        width: 250,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },



    //mobile design
    mainLoginContainer: {
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: 'space-between'
    },

    loginContainer: {
        marginLeft: 24,
        marginRight: 24,
    },

    brandLogo: {
        width: 300,
        height: 100,
        marginTop: '12%'
    },
    centerContainer: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    welcomeText: {
        textAlign: "center",
        marginTop: 50,
        //fontSize: 40,
        fontSize: hp('6%'),
        color: "#F6F6F6",
    },
    loginMessage: {
        marginTop: 10,
        //fontSize: 16,
        fontSize: hp('2.5%'),
        color: '#fff'
    },

    loginMenu: {
        marginTop: 0,
        flexDirection: "row",
        //width: "100%",
        width: wp('100%'),
        justifyContent: 'space-between',
        paddingHorizontal: 30
    },
    loginBtn: {
        // height: 45,
        // width: 240,
        width: wp('55%'),
        height: hp('7%'),
        borderRadius: 20,
        marginBottom: 10
    },
    mainText: {
        //fontSize: Platform.OS === 'ios' ? 16 : 15,
        fontSize: hp('2.5%'),
        textAlign: "center",
        color: "#fff",
    },
});