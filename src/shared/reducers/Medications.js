import { GETTING_MEDS, GETTING_MEDS_SUCCESS, GETTING_MEDS_FAILED, GETTING_ALLERGIES_FAILED } from "../constants/Constant";

//inital state
const initalState = {
    Medication: [],
    isGetting: false,
    error: false
}

//export default state
export default function medicationReducer(state = initalState, action) {
    switch (action.type) {
        case GETTING_MEDS:
            return {
                ...state,
                isGetting: true
            }

        case GETTING_MEDS_SUCCESS:
            return {
                ...state,
                isGetting: false,
                Medication: action.data
            }

        case GETTING_ALLERGIES_FAILED:
            return {
                ...state,
                isGetting: false,
                error: true
            }

        default:
            return state
    }
}