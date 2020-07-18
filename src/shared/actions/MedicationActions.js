import { GETTING_MEDS, GETTING_MEDS_SUCCESS, GETTING_MEDS_FAILED } from "../constants/Constant";
import getAllMedications from "../services/MedicationService";
import getUserId from "../core/GetToken";

//function will return data
export const fetchMedsFromApi = (token, pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getMed())
        getUserId().then((data) => {
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber;
            getAllMedications(queryString)
                .then(data => data.json())
                .then(json => {
                    //console.log(json)
                    dispatch(getMedSuccess(json[0].entry))
                })
                .catch(err => dispatch(getMedFailed(err)))
        })
    }
}

//start getting data
const getMed = () => {
    return {
        type: GETTING_MEDS
    }
}

//data is success
const getMedSuccess = (data) => {
    return {
        type: GETTING_MEDS_SUCCESS,
        data
    }
}

//data failed
const getMedFailed = () => {
    return {
        type: GETTING_MEDS_FAILED
    }
}