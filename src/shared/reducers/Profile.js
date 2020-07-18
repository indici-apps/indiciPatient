import { GETTING_PROFILE, GETTING_PROFILE_SUCCESS, GETTING_PROFILE_FAILURE } from "../constants/Constant";


//current state
const intitalState = {
    Profile: [],
    isFetching: false,
    error: false
}

//export requried state

export default function profileReducer(state = intitalState, action) {
    switch (action.type) {
        case GETTING_PROFILE:
            return {
                ...state,
                isFetching: true
            }

        case GETTING_PROFILE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                Profile: action.data
            }

        case GETTING_PROFILE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }

        default:
            return state
    }
}