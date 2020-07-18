import {  GETTING_PROFILE , GETTING_PROFILE_SUCCESS , GETTING_PROFILE_FAILURE} from "../constants/Constant";
import getPatientProfile from "../services/ProfileService";
import getUserId from "../core/GetToken";



export const fetchProfileFromApi = () => {
    return (dispatch) => {
        dispatch(getProfile())

        getUserId().then((usertoken) => {
            // console.log(data);
            // token = data
            const queryString = '?Token='+usertoken+'&PatientID=2255013';
            getPatientProfile(queryString)
                .then(data => data.json())
                .then(json => {
                    console.log(json)
                    dispatch(getProfileSuccess(json[0].entry))
                })
                .catch(err => dispatch(getProfileFailure(err)))
        })


    }
}




//state getting 
const getProfile = () => {
    return{
        type: GETTING_PROFILE
    }
}


//data success
const getProfileSuccess =  (data) => {
    return{
        type: GETTING_PROFILE_SUCCESS,
        data,
    }
}


//data failed
const getProfileFailure = () =>{
    return{
        type: GETTING_PROFILE_FAILURE
    }

}