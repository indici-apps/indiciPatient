import { GETTING_RECP , GETTING_RECP_SUCCESS , GETTING_RECP_FAIL  } from "../constants/Constant";
import getPatientRecp from "../services/RecpService";
import getUserId from "../core/GetToken";


export const fetctRecpFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getRecp())
        getUserId().then((data) => {
            //fetch('https://stagingindiciconnect.itsmyhealth.nz/api/?Tozken=c72bf947-4549-4d0d-b7de-141617e52b87&PatientID=2255013&PageSize=10&PageNumber=1', requestOptions)
            const queryString = '?Token=' + data + '&PatientID=2255013';//&PageSize=' + pageSize + '&PageNumber=' + pageNumber
            getPatientRecp(queryString)
                .then(data => data.json())
                .then(json => {
                    console.log('Hello:', json)
                    dispatch(getRecpSuccess(json[0].entry))
                })
                .catch(err => dispatch(getRecpFail(err)))
        })


    }
}




const getRecp = () =>{
    return{
        type: GETTING_RECP
    }
}

//data success
const getRecpSuccess = (data) => {
    return {
        type: GETTING_RECP_SUCCESS,
        data,
    }
}

//data failed
const getRecpFail = () => {
    return {
        type: GETTING_RECP_FAIL
    }
}

