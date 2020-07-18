import { GETTING_TIMELINE, GETTING_TIMELINE_SUCCESS, GETTING_TIMELINE_FAILED } from "../constants/Constant";


//start state
const initailState = {
    Timeline: [],
    isGetting: false,
    error: false
}


export default function timelineReducer(state = initailState, action) {
    switch (action.type) {
        case GETTING_TIMELINE:
            return {
                ...state,
                isGetting: true
            }

        case GETTING_TIMELINE_SUCCESS:
            return {
                ...state,
                isGetting: false,
                Timeline: action.data
            }

        case GETTING_TIMELINE_FAILED:
            return {
                ...state,
                isGetting: false,
                error: true
            }

        default:
            return state;
    }
}