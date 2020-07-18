import { GETTING_ALLERGIES, GETTING_ALLERGIES_SUCCESS, GETTING_ALLERGIES_FAILED } from '../constants/Constant'


//set current state
const initialState = {
    Allergies: [],
    isGetting: false,
    error: false
}

//export default state
export default function allergiesReducer(state = initialState, action) {
    switch (action.type) {
        case GETTING_ALLERGIES:
            return {
                ...state,
                isGetting: true
            }

        case GETTING_ALLERGIES_SUCCESS:
            return {
                ...state,
                isGetting: false,
                Allergies: action.data,
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