import { START_APPOINTMENT_CANCELLATION, START_APPOINTMENT_CANCELLATION_SUCESSS, START_APPOINTMENT_CANCELLATION_FAIL } from "../constants/Constant";
import cancelPatientAppointment from "../services/CancelBookedAppointmentService";
import getUserId from "../core/GetToken";

export const addPaitentAppoinmenttoAPI = (slotid, reason) => {
    return (disptach) => {
        disptach(cancelAppoint())
        getUserId().then((data) => {
            const queryString = '?Token=' + data + '&PatientID=17308&AppointmentId=' + slotid + '&Reason=Testing%20the%20booking%20for%20mobile%20app'
            cancelPatientAppointment(queryString)
                .then(data => data.json())
                .then(json => {
                    //console.log("DATA FOUND: "+ json)
                    disptach(cancelAppointSuccess(json))
                })
                .catch(err => disptach(cancelAppointFail(console.log(err))))
        })

    }
}


const cancelAppoint = () => {
    return {
        type: START_APPOINTMENT_CANCELLATION
    }
}

//data success
const cancelAppointSuccess = (data) => {
    return {
        type: START_APPOINTMENT_CANCELLATION_SUCESSS,
        data,
    }
}

//data failed
const cancelAppointFail = () => {
    return {
        type: START_APPOINTMENT_CANCELLATION_FAIL
    }
}
