import { GETTING_ALLERGIES, GETTING_ALLERGIES_SUCCESS, GETTING_ALLERGIES_FAILED } from "../constants/Constant";
import getAllergies from "../services/AllergiesServices";
import getUserId from "../core/GetToken";

//function will return data
export const fetchAllergyFromApi = (token, pageNumber, pageSize) => {
    return (disptach) => {
        disptach(getAlg())
        getUserId().then((data) => {
            // token = data
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber;
            getAllergies(queryString)
                .then(data => data.json())
                .then(json => {
                    //console.log("DATA FOUND: ", json)
                    disptach(getAlgSuccess(json[0].entry))
                })
                .catch(err => disptach(getAlgFailed(console.log(err))))
        })

    }
}


//start getting data
const getAlg = () => {
    return {
        type: GETTING_ALLERGIES
    }
}

//date success
const getAlgSuccess = (data) => {
    return {
        type: GETTING_ALLERGIES_SUCCESS,
        data,
    }
}

//data faied
const getAlgFailed = () => {
    return {
        type: GETTING_ALLERGIES_FAILED
    }
}