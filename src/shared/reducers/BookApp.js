import { BOOK_APP, BOOK_APP_SUCCESS, BOOK_APP_FAIL, BOOK_APP_CLEANUP } from "../constants/Constant";

//inital state
const initalState = {
    isBooking: false,
    BookApp: [],
    error: false
}

//export default state
export default function bookappReducer(state = initalState, action) {
    switch (action.type) {
        case BOOK_APP:
            return {
                ...state,
                isBooking: true,
                BookApp: []
            }

        case BOOK_APP_SUCCESS:
            return {
                ...state,
                isBooking: false,
                BookApp: action.data
            }

        case BOOK_APP_FAIL:
            return {
                ...state,
                isBooking: false,
                error: true
            }

        case BOOK_APP_CLEANUP:
            return {
                ...state,
                isBooking: false,
                BookApp: []
            }
        default:
            return state
    }
}