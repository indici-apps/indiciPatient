import { GETTING_RESOURCES, GETTING_RESOURCES_SUCCESS, GETTING_RESOURCES_FAILED, GETTING_ALLERGIES_FAILED } from "../constants/Constant";


//set default state
const initalState = {
    Resources: [],
    isGetting: false,
    error: false
}


//export the default state
export default function resourcesReducer(state = initalState, action) {
    switch (action.type) {
        case GETTING_RESOURCES:
            return {
                ...state,
                isGetting: true
            }


        case GETTING_RESOURCES_SUCCESS:
            return {
                ...state,
                isGetting: false,
                Resources: action.data
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