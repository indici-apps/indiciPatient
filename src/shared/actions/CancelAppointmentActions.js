import { GETTING_CANCEL_APPOINTMENT, GETTING_CANCEL_APPOINTMENT_SUCCESS, GETTING_CANCEL_APPOINTMENTT_FAILURE } from "../constants/Constant";
import getPaitentAppointments from "../services/AppointmentServices";
import getUserId from "../core/GetToken";

//to get all diagnosis
export const fetchcAppointmentsFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getCancelAppoint())
        getUserId().then((data) => {
            //const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber + '&AppointmentType=4'
            getPaitentAppointments(queryString)
                .then(data => data.json())
                .then(json => {
                    console.log(json);
                    json[0].hasOwnProperty('entry') ? dispatch(getCancelAppointSucess(json[0].entry)) : dispatch(getCancelAppointFinished())
                })
                .catch(err => dispatch(getCancelAppointFail(err)))
        })
    }
}


const getCancelAppoint = () => {
    return {
        type: GETTING_CANCEL_APPOINTMENT
    }
}

//data success
const getCancelAppointSucess = (data) => {
    return {
        type: GETTING_CANCEL_APPOINTMENT_SUCCESS,
        data,
    }
}

//data failed
const getCancelAppointFail = () => {
    return {
        type: GETTING_CANCEL_APPOINTMENTT_FAILURE
    }
}
const getCancelAppointFinished = () => {
    return null;
}


