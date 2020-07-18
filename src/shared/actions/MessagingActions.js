import { GETTING_MESSAGE , GETTING_MESSAGE_SUCCESS , GETTING_MESSAGE_MORE_SUCCESS, GETTING_MESSAGE_FAIL  } from "../constants/Constant";
import getPaitentMsg from "../services/MessagingService";
import getUserId from "../core/GetToken";


export const fetchMessageFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getMessage())
        getUserId().then((data) => {
            //fetch('https://stagingindiciconnect.itsmyhealth.nz/api/?Tozken=c72bf947-4549-4d0d-b7de-141617e52b87&PatientID=2255013&PageSize=10&PageNumber=1', requestOptions)
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber +'&Type=1&MessagingType=1'
            getPaitentMsg(queryString)
                .then(data => data.json())
                .then(json => {
                    //console.log('Hello:', json)
                     json[0].hasOwnProperty('entry') ? dispatch(getMessageSuccess(json[0].entry)) : dispatch(getMessageFinsihed())
                })
                .catch(err => dispatch(getMessageFail(err)))
        })
    }
}


export const fetchMoreMessageFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getMessage())
        getUserId().then((data) => {
            //fetch('https://stagingindiciconnect.itsmyhealth.nz/api/?Tozken=c72bf947-4549-4d0d-b7de-141617e52b87&PatientID=2255013&PageSize=10&PageNumber=1', requestOptions)
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber +'&Type=1&MessagingType=1'
            getPaitentMsg(queryString)
                .then(data => data.json())
                .then(json => {
                    json[0].hasOwnProperty('entry') ? dispatch(getMessageMoreSuccess(json[0].entry)) : dispatch(getMessageFinsihed())
                })
                .catch(err => dispatch(getMessageFail(err)))
        })
    }
}




const getMessage = () =>{
    return{
        type: GETTING_MESSAGE
    }
}

//data success
const getMessageSuccess = (data) => {
    return {
        type: GETTING_MESSAGE_SUCCESS,
        data,
    }
}

const getMessageMoreSuccess = (data) => {
    return {
        type: GETTING_MESSAGE_MORE_SUCCESS,
        data,
    }
}

//data failed
const getMessageFail = () => {
    return {
        type: GETTING_MESSAGE_FAIL
    }
}

const getMessageFinsihed = () => {
    return null;
}


