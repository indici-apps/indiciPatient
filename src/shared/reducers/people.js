import { FETCHING_PEOPLE, FETCHING_PEOPLE_SUCCESS, FETCHING_PEOPLE_SUCCESS_MORE, FETCHING_PEOPLE_FAILURE } from "../constants/Constant";


//create initial state
const initailState = {
    people: [],
    isFetching: false,
    error: false
}


//export the defult state
export default function peopleReduer(state = initailState, action) {
    switch (action.type) {
        case FETCHING_PEOPLE:
            // return Object.assign({} , state, {
            //     isFetching: true
            // })
            return {
                ...state,
                //people: [],
                isFetching: true,
            }
        case FETCHING_PEOPLE_SUCCESS:
            // return  Object.assign({} , state ,{
            //     isFetching: false,
            //     people: action.data
            // })
            return {
                ...state,
                isFetching: false,
                //people: state.people.concat(action.data)
                people: [...state.people, ...action.data]
                //people: action.data
            }

        case FETCHING_PEOPLE_SUCCESS_MORE:
            return {
                ...state,
                isFetching: false,
                people: state.people.concat(action.data)
                //people: [...state, ...action.data]
                //people: action.data
            }

        case FETCHING_PEOPLE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }

        default:
            return state
    }
}