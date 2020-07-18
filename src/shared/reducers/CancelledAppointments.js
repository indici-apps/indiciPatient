//CancelledAppointments.js
import { GETTING_CANCEL_APPOINTMENT, GETTING_CANCEL_APPOINTMENT_SUCCESS, GETTING_CANCEL_APPOINTMENTT_FAILURE } from "../constants/Constant";

//inital state
const initalState = {
    CancelledAppointments: [],
    isGetting: false,
    error: false
}

//export default state
export default function fappointmentReducer(state = initalState, action) {
    switch (action.type) {
        case GETTING_CANCEL_APPOINTMENT:
            return {
                ...state,
                isGetting: true
            }

        case GETTING_CANCEL_APPOINTMENT_SUCCESS:
            return {
                ...state,
                isGetting: false,
                CancelledAppointments: [...state.CancelledAppointments, ...action.data]
                //Medication: action.data
            }

        case GETTING_CANCEL_APPOINTMENTT_FAILURE:
            return {
                ...state,
                isGetting: false,
                error: true
            }

        default:
            return state
    }
}