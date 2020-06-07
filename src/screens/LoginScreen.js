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
    TouchableOpacity
} from 'react-native';
import BackButton from '../components/BackButton';
import { emailValidator, passwordValidator } from '../core/utils';
import UserInput from '../components/UserInput';
import CustomView from '../components/CustomView';
import {AuthContext} from '../core/context'; 
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const LoginScreen = props => {

    const { signIn } = React.useContext(AuthContext);
    // const [bgImage, setbgImage] = useState();
    // useEffect(() => {
    //     setbgImage(<ImageBackground source={require('../../assets/login_cover.png')} />);
    // }, []);

    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const _onLoginPressed = () => {
         const emailError = emailValidator(email.value);
         const passwordError = passwordValidator(password.value);

     


        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        if (email.value != 'hahmed412@gmail.com') {
            alert("Your login details are incorrect..!!");
            return
        }

        if (password.value != '12345') {
            alert("Your login details are incorrect..!!");
            return
        }
        signIn(email.value);
      
        // props.navigation.navigate('Home');


    }

    return (
        <ImageBackground source={require('../../assets/login_cover.png')} style={styles.loginCover}>
            <StatusBar barStyle='light-content' />
            <View style={styles.mainLoginContainer}>
                <View style={styles.centerContainer}>
                    <Text style={styles.welcomeText}>Login Now</Text>
                    <Text style={styles.loginMessage}>Please Login to Continue using our App</Text>

                    <Image
                        style={styles.brandLogo}
                        source={require('../../assets/brand_logo_trans.png')} />

                    <UserInput
                        label="Email"
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={text => setEmail({ value: text, error: '' })}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        placeholder="Enter your email" />

                    <UserInput
                        label="Password"
                        returnKeyType="done"
                        value={password.value}
                        onChangeText={text => setPassword({ value: text, error: '' })}
                        error={!!password.error}
                        errorText={password.error}
                        secureTextEntry={true} 
                        placeholder="Enter your password" />

                    <View style={styles.loginMenu}>
                        <Text style={{ color: '#fff' }}></Text>
                        <TouchableOpacity><Text style={{ color: '#fff', fontSize: hp('2.5%')}}>Forget Password?</Text></TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <TouchableOpacity onPress={_onLoginPressed}>
                            <Image
                                style={styles.loginBtn}
                                source={require('../../assets/login_btn.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.centerContainer} >
                    <TouchableOpacity style={{ marginBottom: 20 }}  onPress={() => props.navigation.navigate('LoginHelp')}>
                        <Text style={styles.mainText}>If you are not able to login click here for help.</Text>
                        <Text style={styles.mainText}>OR Call your practice for further assistance.</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>

    );
};
const styles = StyleSheet.create({
    mainLoginContainer: {
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: 'space-between'
    },
    loginCover: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        backgroundColor: 'rgba(0,0,0,0.9)'
    },
    loginContainer: {
        marginLeft: 24,
        marginRight: 24,
    },

    brandLogo: {
        // width: 300,
        // height: 100,
        width: wp('65%'),
        height: hp('13%'),
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

export default LoginScreen;


// function LoginScreen({navigation}){
//     const [email , setEmail] = useState({value: '' , error: ''});
//     const _onLoginPressed = () =>{
//         //console.log("Button Was Fine");

//         const emailError = emailValidator(email.value);
//         if(emailError){
//             setEmail({...email, emailError: emailError});
//             console.log("Email is incorrect");
//             return;
//         }else{
//             console.log("email is correct");
//             navigation.navigate('Appnav');
//         }
//     };
//     return (
//         <View>
//             <Text>Welcome to Login Screen</Text>
//             <BackButton goBack={() => navigation.navigate('Home')} />

//             <UserInput
//                 label="Email"
//                 returnKeyType="next"
//                 value={email.value}
//                 onChangeText={text => setEmail({ value: text, error: '' })}
//                 error={!!email.error}
//                 errorText={email.error}
//                 autoCapitalize="none"
//                 autoCompleteType="email"
//                 textContentType="emailAddress"
//                 keyboardType="email-address"
//             />

//             <Button title="Login Btn"  onPress={_onLoginPressed}/>

//         </View>
//     );
// }




// export default memo(LoginScreen);