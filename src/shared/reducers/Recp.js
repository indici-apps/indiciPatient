import { GETTING_RECP , GETTING_RECP_SUCCESS , GETTING_RECP_FAIL  } from "../constants/Constant";


//inital state
const initalState = {
    Recp: [],
    isSearching: false,
    error: false
}

//export default state
export default function recpReducer(state = initalState, action) {
    switch (action.type) {
        case GETTING_RECP:
            return {
                ...state,
                isSearching: true
            }

        case GETTING_RECP_SUCCESS:
            return {
                ...state,
                isSearching: false,
                Recp: action.data
            }

        case GETTING_RECP_FAIL:
            return {
                ...state,
                isSearching: false,
                error: true
            }
        default:
            return state
    }
}