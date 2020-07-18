import { GETTING_SENT_MESSAGE , GETTING_MESSAGE_SENT_SUCCESS , GETTING_MESSAGE_SENT_MORE_SUCCESS, GETTING_MESSAGE_SENT_FAIL  } from "../constants/Constant";
import getPaitentMsg from "../services/MessagingService";
import getUserId from "../core/GetToken";


export const fetchSentMessageFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getsSentMessage())
        getUserId().then((data) => {
            //fetch('https://stagingindiciconnect.itsmyhealth.nz/api/?Tozken=c72bf947-4549-4d0d-b7de-141617e52b87&PatientID=2255013&PageSize=10&PageNumber=1', requestOptions)
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber +'&Type=1&MessagingType=2'
            getPaitentMsg(queryString)
                .then(data => data.json())
                .then(json => {
                    //console.log('Hello:', json)
                    json[0].hasOwnProperty('entry') ? dispatch(getsSentMessageSuccess(json[0].entry)) : dispatch(getsSentMessageFinsihed())
                })
                .catch(err => dispatch(getsSentMessageFail(err)))
        })
    }
}


export const fetchSentMoreMessageFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getsSentMessage())
        getUserId().then((data) => {
            //fetch('https://stagingindiciconnect.itsmyhealth.nz/api/?Tozken=c72bf947-4549-4d0d-b7de-141617e52b87&PatientID=2255013&PageSize=10&PageNumber=1', requestOptions)
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber +'&Type=1&MessagingType=2'
            getPaitentMsg(queryString)
                .then(data => data.json())
                .then(json => {
                    json[0].hasOwnProperty('entry') ? dispatch(getsSentMessageMoreSuccess(json[0].entry)) : dispatch(getsSentMessageFinsihed())
                })
                .catch(err => dispatch(getsSentMessageFail(err)))
        })
    }
}




const getsSentMessage = () =>{
    return{
        type: GETTING_SENT_MESSAGE
    }
}

//data success
const getsSentMessageSuccess = (data) => {
    return {
        type: GETTING_MESSAGE_SENT_SUCCESS,
        data,
    }
}

const getsSentMessageMoreSuccess = (data) => {
    return {
        type: GETTING_MESSAGE_SENT_MORE_SUCCESS,
        data,
    }
}

//data failed
const getsSentMessageFail = () => {
    return {
        type: GETTING_MESSAGE_SENT_FAIL
    }
}

const getsSentMessageFinsihed = () => {
    return null;
}


