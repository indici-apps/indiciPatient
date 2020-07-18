import { GETTING_APPOINTMENT, GETTING_APPOINTMENT_SUCCESS, GETTING_APPOINTMENT_FAILURE } from "../constants/Constant";

//inital state
const initalState = {
    FutureAppointments: [],
    isGetting: false,
    error: false
}

//export default state
export default function fappointmentReducer(state = initalState, action) {
    switch (action.type) {
        case GETTING_APPOINTMENT:
            return {
                ...state,
                isGetting: true
            }

        case GETTING_APPOINTMENT_SUCCESS:
            return {
                ...state,
                isGetting: false,
                //FutureAppointments: [...state.FutureAppointments, ...action.data]
                FutureAppointments: action.data
            }

        case GETTING_APPOINTMENT_FAILURE:
            return {
                ...state,
                isGetting: false,
                error: true
            }

        default:
            return state
    }
}