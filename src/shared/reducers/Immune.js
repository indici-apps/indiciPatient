import { GETTING_IMMUNE, GETTING_IMMUNE_SUCCESS, GETTING_IMMUNE_MORE_SUCCESS, GETTING_IMMUNE_FAILURE } from "../constants/Constant";

//inital state
const initalState = {
    Immune: [],
    isGetting: false,
    error: false
}

//export default state
export default function immuneReducer(state = initalState, action) {
    switch (action.type) {
        case GETTING_IMMUNE:
            return {
                ...state,
                isGetting: true
            }

        case GETTING_IMMUNE_SUCCESS:
            return {
                ...state,
                isGetting: false,
                Immune: action.data
            }

        case GETTING_IMMUNE_MORE_SUCCESS:
            return {
                ...state,
                isGetting: false,
                Immune: state.Immune.concat(action.data)
            }


        case GETTING_IMMUNE_FAILURE:
            return {
                ...state,
                isGetting: false,
                error: true
            }
        default:
            return state
    }
}