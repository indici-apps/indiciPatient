import { GETTING_COMPLETED_APPOINTMENT , GETTING_COMPLETED_APPOINTMENT_SUCCESS , GETTING_COMPLETED_APPOINTMENTT_FAILURE  } from "../constants/Constant";

//inital state
const initalState = {
    CompletedAppointment: [],
    isGetting: false,
    error: false
}

//export default state
export default function fappointmentReducer(state = initalState, action) {
    switch (action.type) {
        case GETTING_COMPLETED_APPOINTMENT:
            return {
                ...state,
                isGetting: true
            }

        case GETTING_COMPLETED_APPOINTMENT_SUCCESS:
            return {
                ...state,
                isGetting: false,
                CompletedAppointment: [...state.CompletedAppointment, ...action.data]
                //Medication: action.data
            }

        case GETTING_COMPLETED_APPOINTMENTT_FAILURE:
            return {
                ...state,
                isGetting: false,
                error: true
            }

        default:
            return state
    }
}