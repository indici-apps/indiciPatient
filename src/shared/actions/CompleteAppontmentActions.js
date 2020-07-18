import { GETTING_COMPLETED_APPOINTMENT, GETTING_COMPLETED_APPOINTMENT_SUCCESS, GETTING_COMPLETED_APPOINTMENTT_FAILURE } from "../constants/Constant";
import getPaitentAppointments from "../services/AppointmentServices";
import getUserId from "../core/GetToken";

//to get all diagnosis
export const fetchAppointmentsFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getCompAppoint())
        getUserId().then((data) => {
            //const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber + '&AppointmentType=3'
            getPaitentAppointments(queryString)
                .then(data => data.json())
                .then(json => {
                    //console.log(json);
                    json[0].hasOwnProperty('entry') ? dispatch(getCompAppointSucess(json[0].entry)) : dispatch(getCompAppointFinished())
                })
                .catch(err => dispatch(getCompAppointFail(err)))
        })
    }
}







const getCompAppoint = () => {
    return {
        type: GETTING_COMPLETED_APPOINTMENT
    }
}

//data success
const getCompAppointSucess = (data) => {
    return {
        type: GETTING_COMPLETED_APPOINTMENT_SUCCESS,
        data,
    }
}

//data failed
const getCompAppointFail = () => {
    return {
        type: GETTING_COMPLETED_APPOINTMENTT_FAILURE
    }
}
const getCompAppointFinished = () => {
    return null;
}


