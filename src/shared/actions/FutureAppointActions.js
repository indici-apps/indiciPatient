import { GETTING_APPOINTMENT , GETTING_APPOINTMENT_SUCCESS , GETTING_APPOINTMENT_FAILURE  } from "../constants/Constant";
import getPaitentAppointments from "../services/AppointmentServices";
import getUserId from "../core/GetToken";

//to get all diagnosis
export const fetchfAppointmentsFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getAppoint())
        getUserId().then((data) => {
            //const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber + '&AppointmentType=1'
            getPaitentAppointments(queryString)
                .then(data => data.json())
                .then(json => {
                    console.log(json);
                    json[0].hasOwnProperty('entry') ? dispatch(getAppointSucess(json[0].entry)) : dispatch(getAppointFinished())
                })
                .catch(err => dispatch(getAppointFail(err)))
        })
    }
}

const getAppoint = () =>{
    return{
        type: GETTING_APPOINTMENT
    }
}

//data success
const getAppointSucess = (data) => {
    return {
        type: GETTING_APPOINTMENT_SUCCESS,
        data,
    }
}

//data failed
const getAppointFail = () => {
    return {
        type: GETTING_APPOINTMENT_FAILURE
    }
}

const getAppointFinished = () => {
    return null;
}


