import { GETTING_IMMUNE, GETTING_IMMUNE_SUCCESS, GETTING_IMMUNE_MORE_SUCCESS, GETTING_IMMUNE_FAILURE } from "../constants/Constant";
import getAllImmune from "../services/ImmuneService";
import getUserId from "../core/GetToken";


//get all immune
export const fetchImmunefromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getImmune())
        getUserId().then((data) => {
            //fetch('https://stagingindiciconnect.itsmyhealth.nz/api/?Tozken=c72bf947-4549-4d0d-b7de-141617e52b87&PatientID=2255013&PageSize=10&PageNumber=1', requestOptions)
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber
            getAllImmune(queryString)
                .then(data => data.json())
                .then(json => {
                    // console.log('Hello:', json)
                    dispatch(getImmuneSuccess(json[0].entry))

                })
                .catch(err => dispatch(getImmuneFail(err)))
        })
    }
}

// //load more immunue
export const fetchMoreImmunefromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getImmune())
        getUserId().then((data) => {
            //fetch('https://stagingindiciconnect.itsmyhealth.nz/api/?Tozken=c72bf947-4549-4d0d-b7de-141617e52b87&PatientID=2255013&PageSize=10&PageNumber=1', requestOptions)
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber
            console.log(queryString)
            getAllImmune(queryString)
                .then(data => data.json())
                .then(json => {

                    json[0].hasOwnProperty('entry') ? dispatch(getImmuneMoreSuccess(json[0].entry)) : dispatch(getImmuneFinshed())
                    // if (json != null) {
                       
                    // } else {
                    //     dispatch(getImmuneFinshed())
                    // }
                })
                .catch(err => dispatch(getImmuneFail(err)))
        })
    }
}



const getImmune = () => {
    return {
        type: GETTING_IMMUNE
    }
}

//data success
const getImmuneSuccess = (data) => {
    return {
        type: GETTING_IMMUNE_SUCCESS,
        data,
    }
}

//data success
const getImmuneMoreSuccess = (data) => {
    return {
        type: GETTING_IMMUNE_MORE_SUCCESS,
        data,
    }
}

//data failed
const getImmuneFail = () => {
    return {
        type: GETTING_IMMUNE_FAILURE
    }
}

const getImmuneFinshed = () => {
    return null;
}

