import { GETTING_MESSAGE, GETTING_MESSAGE_SUCCESS,  GETTING_MESSAGE_MORE_SUCCESS, GETTING_MESSAGE_FAIL } from "../constants/Constant";

//inital state
const initalState = {
    Messaging: [],
    isGetting: false,
    error: false
}

//export default state
export default function messaginReducer(state = initalState, action) {
    switch (action.type) {
        case GETTING_MESSAGE:
            return {
                ...state,
                isGetting: true
            }

        case GETTING_MESSAGE_SUCCESS:
            return {
                ...state,
                isGetting: false,
                //Messaging: [...state.Messaging, ...action.data]
               // Messaging: action.data
               Messaging: [...state.Messaging, ...action.data]
            }

        case GETTING_MESSAGE_MORE_SUCCESS:
            return {
                ...state,
                isGetting: false,
                Messaging: [...state.Messaging, ...action.data]
                //Messaging: state.Messaging.concat(action.data)
            }

        case GETTING_MESSAGE_FAIL:
            return {
                ...state,
                isGetting: false,
                error: true
            }
        default:
            return state
    }
}