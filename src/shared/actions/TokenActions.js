import { GETTING_TOKEN, GETTING_TOKEN_SUCESS, GETTING_TOKEN_FAILED } from "../constants/Constant";
import { AsyncStorage } from "react-native";

export function fetchToken() {

    clearStorage();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "UserName": "ICStagingPP1", "Password": "Welcome@123" });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return (dispatch) => {
        dispatch(getToken())
        fetch("https://stagingindiciconnect.itsmyhealth.nz/api/Authentication", requestOptions)
            .then(data => data.json())
            .then(json => {
                console.log('json:', json)
                AsyncStorage.setItem('secureToken', json);  
                dispatch(getTokenSuccess(json))
                
            })
            .catch(err => dispatch(getTokenFailed(err)))
    }
}

const clearStorage = async () => {
    try {
        await AsyncStorage.clear()
        //alert('Storage successfully cleared!')
    } catch (e) {
        //alert('Failed to clear the async storage.')
    }
}

const getToken = () => {
    return {
        type: GETTING_TOKEN
    }
}


const getTokenSuccess = (data) => {
   // AsyncStorage.setItem('jwtToken', data);
    return {
        type: GETTING_TOKEN_SUCESS,
        data
    }
}

const getTokenFailed = () => {
    return {
        type: GETTING_TOKEN_FAILED
    }
}