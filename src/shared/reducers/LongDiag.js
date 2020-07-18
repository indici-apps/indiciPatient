import { FETCHING_LONGTERM_PEOPLE, FETCHING_LONGTERM_PEOPLE_SUCCESS, FETCHING_LONGTERM_PEOPLE_SUCCESS_MORE, FETCHING_LONGTERM_PEOPLE_FAILURE } from '../constants/Constant'


//SET INITAILS STATE
const initialState = {
    LongDiag: [],
    isFetching: false,
    error: false
}

//export the defult state

export default function DiagnosisReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_LONGTERM_PEOPLE:
            return {
                ...state,
                isFetching: true
            }

        case FETCHING_LONGTERM_PEOPLE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                //LongDiag: state.LongDiag.concat(action.payload)
                LongDiag: action.payload
            }

        case FETCHING_LONGTERM_PEOPLE_SUCCESS_MORE:
            return {
                ...state,
                isFetching: false,
                LongDiag: state.LongDiag.concat(action.payload)
                //LongDiag: action.payload
            }

        case FETCHING_LONGTERM_PEOPLE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }

        default:
            return state
    }
}