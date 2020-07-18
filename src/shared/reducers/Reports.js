import { GETING_REPORTS , GETING_REPORTS_SUCCESS , GETING_REPORTS_FAILURE } from "../constants/Constant";


//current state

const initialState = {
    Reports: [],
    isFetching: false,
    error: false
}


export default function reportsReducer(state=initialState , action){
    switch(action.type){
        case GETING_REPORTS:
            return{
                ...state,
                isFetching: true
            }

        case GETING_REPORTS_SUCCESS:
            return{
                ...state,
                isFetching: false,
                Reports: action.data
            }

        case GETING_REPORTS_FAILURE:
            return{
                ...state,
                isFetching: false,
                error: true,
            }

        default:
            return state
    }
}