import { GETTING_SENT_MESSAGE , GETTING_MESSAGE_SENT_SUCCESS , GETTING_MESSAGE_SENT_MORE_SUCCESS, GETTING_MESSAGE_SENT_FAIL  } from "../constants/Constant";

//inital state
const initalState = {
    SentItems: [],
    isGetting: false,
    error: false
}

//export default state
export default function sentMessaginReducer(state = initalState, action) {
    switch (action.type) {
        case GETTING_SENT_MESSAGE:
            return {
                ...state,
                isGetting: true
            }

        case GETTING_MESSAGE_SENT_SUCCESS:
            return {
                ...state,
                isGetting: false,
                SentItems: action.data
            }

        case GETTING_MESSAGE_SENT_MORE_SUCCESS:
            return {
                ...state,
                isGetting: false,
                SentItems: [...state.SentItems, ...action.data]
                //Messaging: state.Messaging.concat(action.data)
            }

        case GETTING_MESSAGE_SENT_FAIL:
            return {
                ...state,
                isGetting: false,
                error: true
            }
        default:
            return state
    }
}