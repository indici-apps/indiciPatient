import { GET_PENDING_INVOICES , GET_PENDING_INVOICES_SUCCESS , GET_PENDING_INVOICES_MORE_SUCCESS, GET_PENDING_INVOICES_FAIL  } from "../constants/Constant";

//inital state
const initalState = {
    PendingInvc: [],
    isGetting: false,
    error: false
}

//export default state
export default function messaginReducer(state = initalState, action) {
    switch (action.type) {
        case GET_PENDING_INVOICES:
            return {
                ...state,
                isGetting: true
            }

        case GET_PENDING_INVOICES_SUCCESS:
            return {
                ...state,
                isGetting: false,
                PendingInvc: [...state.PendingInvc, ...action.data]
            }

        case GET_PENDING_INVOICES_MORE_SUCCESS:
            return {
                ...state,
                isGetting: false,
                PendingInvc: [...state.PendingInvc, ...action.data]
              
            }

        case GET_PENDING_INVOICES_FAIL:
            return {
                ...state,
                isGetting: false,
                error: true
            }
        default:
            return state
    }
}