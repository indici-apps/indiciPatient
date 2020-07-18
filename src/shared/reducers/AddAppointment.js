import { ADDING_APPOINT, ADDING_APPOINT_SUCCESS, ADDING_APPOINT_FAIL, ADDING_APPOINT_CLEANUP } from "../constants/Constant";

//inital state
const initalState = {
    isAdding: false,
    AddAppointment: '',
    error: false,
    isAvailable: false
}

//export default state
export default function addAppointmentReducer(state = initalState, action) {
    switch (action.type) {
        case ADDING_APPOINT:
            return {
                ...state,
                AddAppointment: '',
                isAdding: true,

            }

        case ADDING_APPOINT_SUCCESS:

            if (action.data === 'Appointment has been booked successfully') {
                return {
                    ...state,
                    isAdding: false,
                    AddAppointment: action.data,
                    isAvailable: true
                }
            } else {
                return {
                    ...state,
                    isAdding: false,
                    AddAppointment: action.data,
                    isAvailable: false
                }
            }


        case ADDING_APPOINT_FAIL:
            return {
                ...state,
                isAdding: false,
                error: true
            }

        case ADDING_APPOINT_CLEANUP:
            return {
                ...state,
                isAdding: false,
                AddAppointment: []
            }
        default:
            return state
    }
}