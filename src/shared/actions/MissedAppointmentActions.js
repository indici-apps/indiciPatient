import { GETTING_MISSED_APPOINTMENT, GETTING_MISSED_APPOINTMENT_SUCCESS, GETTING_MISSED_APPOINTMENTT_FAILURE } from "../constants/Constant";
import getPaitentAppointments from "../services/AppointmentServices";
import getUserId from "../core/GetToken";

//to get all diagnosis
export const fetchmAppointmentsFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getMissedAppoint())
        getUserId().then((data) => {
            //const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber + '&AppointmentType=2'
            getPaitentAppointments(queryString)
                .then(data => data.json())
                .then(json => {
                    console.log(json);
                    json[0].hasOwnProperty('entry') ? dispatch(getMissedAppointSucess(json[0].entry)) : dispatch(getMissedAppointFinished())
                })
                .catch(err => dispatch(getMissedAppointFail(err)))
        })
    }
}







const getMissedAppoint = () => {
    return {
        type: GETTING_MISSED_APPOINTMENT
    }
}

//data success
const getMissedAppointSucess = (data) => {
    return {
        type: GETTING_MISSED_APPOINTMENT_SUCCESS,
        data,
    }
}

//data failed
const getMissedAppointFail = () => {
    return {
        type: GETTING_MISSED_APPOINTMENTT_FAILURE
    }
}
const getMissedAppointFinished = () => {
    return null;
}


