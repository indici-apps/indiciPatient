import { GETTING_TOKEN, GETTING_TOKEN_SUCESS, GETTING_TOKEN_FAILED } from "../constants/Constant";

const initailState = {
    Token: [],
    isFetching: false,
    error: false,
}


export default function tokenReducer(state = initailState, action) {
    switch (action.type) {
        case GETTING_TOKEN:
            return {
                ...state,
                isFetching: true
            }

        case GETTING_TOKEN_SUCESS:
            return {
                ...state,
                isFetching: false,
                Token: action.data
            }

        case GETTING_TOKEN_FAILED:
            return {
                ...state,
                isFetching: false,
                error: true
            }

        default:
            return state
    }
}
