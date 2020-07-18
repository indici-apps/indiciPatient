import { ADDING_APPOINT, ADDING_APPOINT_SUCCESS, ADDING_APPOINT_FAIL, ADDING_APPOINT_CLEANUP } from "../constants/Constant";
import addPatientAppointment from "../services/AddApointmentService";
import getUserId from "../core/GetToken";

export const addPaitentAppoinmenttoAPI = (slotid, reason) => {
    return (disptach) => {
        console.log("Slot in here"+slotid)
        disptach(addAppoint())
        getUserId().then((data) => {
            // token = data
            //const queryString = '?Token='+data+'&PatientID=2255013&ScheduleDate='+passingDate;
            const queryString = '?Token='+data+'&PatientID=17308&SlotID='+slotid+'&Reason=Testing%20the%20booking%20for%20mobile%20app'
            addPatientAppointment(queryString)
                .then(data => data.json())
                .then(json => {
                    //console.log("DATA FOUND: "+ json)
                    disptach(addAppointSuccess(json))
                })
                .catch(err => disptach(addAppointFail(console.log(err))))
        })

    }
}

//for state reset
export const clenuplatData = () => {
    return (disptach) => {
        disptach(addAppointClean())
    }
}


const addAppoint = () => {
    return {
        type: ADDING_APPOINT
    }
}

//data success
const addAppointSuccess = (data) => {
    return {
        type: ADDING_APPOINT_SUCCESS,
        data,
    }
}

//data failed
const addAppointFail = () => {
    return {
        type: ADDING_APPOINT_FAIL
    }
}

const addAppointClean = () => {
    return {
        type: ADDING_APPOINT_CLEANUP
    }
}