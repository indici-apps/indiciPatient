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
    Modal
} from 'react-native';
import BackButton from '../components/BackButton';
import { emailValidator, nhiValidator } from '../core/utils';
import UserInput from '../components/UserInput';
import CustomView from '../components/CustomView';
import { AuthContext } from '../core/context';


const LoginHelpScreen = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const { signIn } = React.useContext(AuthContext);
    // const [bgImage, setbgImage] = useState();
    // useEffect(() => {
    //     setbgImage(<ImageBackground source={require('../../assets/login_cover.png')} />);
    // }, []);


    //for the NHI or Email number
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });




    //getting details for user form
    const [firstName, setFirstname] = useState({ value: '', error: '' });
    const [familyName, setfamilyName] = useState({ value: '', error: '' });
    const [dob, setDob] = useState({ value: '', error: '' });
    const [message, setMessage] = useState({ value: '', error: '' });
    const _onLoginPressed = () => {
        const emailError = emailValidator(email.value);
        const passwordError = nhiValidator(password.value, email.value);



        if (email.value.length > 0 && password.value.length > 0) {
            alert("Please provide Email or NHI number only");
        }
        else {
            if (passwordError) {
                setPassword({ ...password, error: passwordError });
                return;
            }

            alert('ok');
        }



        // if (email.value != 'hahmed412@gmail.com') {
        //     alert("Your login details are incorrect..!!");
        //     return
        // }

        // if (password.value != '12345') {
        //     alert("Your login details are incorrect..!!");
        //     return
        // }
        //signIn(email.value);

        // props.navigation.navigate('Home');


    }

    const _onSubmitFomrPress = () => {
        alert('OK');
        setModalVisible(!modalVisible);
    }

    return (
        <ImageBackground source={require('../../assets/login_cover.png')} style={styles.loginCover}>
            <StatusBar barStyle='light-content' />
            <View style={styles.mainLoginContainer}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <UserInput
                              
                                returnKeyType="done"
                                value={firstName.value}
                                onChangeText={text => setFirstname({ value: text, error: '' })}
                                error={!!password.error}
                                errorText={password.error}
                                placeholder="First name" />

                            <UserInput
                               
                                returnKeyType="done"
                                value={familyName.value}
                                onChangeText={text => setfamilyName({ value: text, error: '' })}
                                error={!!password.error}
                                errorText={password.error}
                                placeholder="Famiy Name" />

                            <UserInput
                               
                                returnKeyType="done"
                                value={dob.value}
                                onChangeText={text => setDob({ value: text, error: '' })}
                                error={!!password.error}
                                errorText={password.error}
                                placeholder="Date of Birth" />


                            <UserInput
                              
                                returnKeyType="done"
                                value={message.value}
                                onChangeText={text => setMessage({ value: text, error: '' })}
                                error={!!password.error}
                                errorText={password.error}
                                multiline={true}
                                numberOfLines={20}
                                placeholder="Enter your Message" />

                            <TouchableOpacity
                                onPress={_onSubmitFomrPress}
                            // onPress={() => {
                            //     setModalVisible(!modalVisible);
                            // }}
                            >
                                <View style={styles.submitBtn}>
                                    <Text style={styles.mainText}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.centerContainer}>
                    <Image
                        style={styles.brandLogo}
                        source={require('../../assets/brand_logo_trans.png')} />
                    <View style={{ marginTop: 30, backgroundColor: 'rgba(0,0,0,0.25)', width: '100%' }}>
                        <Text style={styles.mainText}>If you are having problem with login,</Text>
                        <Text style={styles.mainText}>Please provide us your email or NHI number</Text>
                    </View>
                    <UserInput
                        label="Email"
                        placeholder="Enter your email"
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={text => setEmail({ value: text, error: '' })}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address" />


                    <Text style={styles.loginMessage}>Or</Text>
                    <UserInput
                        label="Password"
                        returnKeyType="done"
                        value={password.value}
                        onChangeText={text => setPassword({ value: text, error: '' })}
                        error={!!password.error}
                        errorText={password.error}
                        placeholder="Enter your NHI Number" />



                    <View style={{ marginTop: 40 }}>
                        <TouchableOpacity onPress={_onLoginPressed}>
                            <View style={styles.submitBtn}>
                                <Text style={styles.mainText}>Submit</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.centerContainer} >
                    <TouchableOpacity style={{ marginBottom: 50 }} onPress={() => {
                        setModalVisible(true);
                    }}>
                        <Text style={styles.mainText}>Do you have another query?</Text>
                        <Text style={styles.mainText}>Click here to contact us</Text>
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
        backgroundColor: 'rgba(0,0,0,1)'
    },
    loginContainer: {
        marginLeft: 24,
        marginRight: 24,
    },

    brandLogo: {
        width: 280,
        height: 80,
        marginTop: 80
    },
    centerContainer: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    welcomeText: {
        textAlign: "center",
        marginTop: 80,
        fontSize: 40,
        color: "#F6F6F6",
    },
    loginMessage: {
        marginTop: 10,
        fontSize: 20,
        color: '#fff'
    },

    loginMenu: {
        marginTop: 10,
        flexDirection: "row",
        width: "100%",
        justifyContent: 'space-between',
        paddingHorizontal: 30
    },
    loginBtn: {
        height: 45,
        width: 240,
        borderRadius: 20
    },
    mainText: {
        fontSize: Platform.OS === 'ios' ? 16 : 15,
        textAlign: "center",
        color: "#fff",

    },

    submitBtn: {
        backgroundColor: '#00A1DE',
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
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



});

export default LoginHelpScreen;


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