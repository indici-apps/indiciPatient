import { GETTING_MISSED_APPOINTMENT, GETTING_MISSED_APPOINTMENT_SUCCESS, GETTING_MISSED_APPOINTMENTT_FAILURE } from "../constants/Constant";

//inital state
const initalState = {
    MissedAppointments: [],
    isGetting: false,
    error: false
}

//export default state
export default function mappointmentReducer(state = initalState, action) {
    switch (action.type) {
        case GETTING_MISSED_APPOINTMENT:
            return {
                ...state,
                isGetting: true
            }

        case GETTING_MISSED_APPOINTMENT_SUCCESS:
            return {
                ...state,
                isGetting: false,
                MissedAppointments: [...state.MissedAppointments, ...action.data]
                //Medication: action.data
            }

        case GETTING_MISSED_APPOINTMENTT_FAILURE:
            return {
                ...state,
                isGetting: false,
                error: true
            }

        default:
            return state
    }
}