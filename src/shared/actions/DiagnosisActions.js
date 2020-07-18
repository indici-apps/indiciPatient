import { FETCHING_PEOPLE, FETCHING_PEOPLE_SUCCESS, FETCHING_PEOPLE_SUCCESS_MORE, FETCHING_PEOPLE_FAILURE, FETCHING_LONGTERM_PEOPLE, FETCHING_LONGTERM_PEOPLE_SUCCESS, FETCHING_LONGTERM_PEOPLE_SUCCESS_MORE, FETCHING_LONGTERM_PEOPLE_FAILURE } from '../constants/Constant'
import getAllDiagnosis from "../services/DiagnosisServices";
import getUserId from "../core/GetToken";

//to get all diagnosis
export const fetchPeopleFromApi = (pageSize, pageNumber, diagType) => {
    return (dispatch) => {
        diagType === 'All' ? dispatch(getPeople()) : dispatch(getPeopleLong())
        getUserId().then((data) => {
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber
            getAllDiagnosis(queryString)
                .then(data => data.json())
                .then(json => {
                    json[0].hasOwnProperty('entry') && diagType === 'All' || diagType === 'Not' ? dispatch(getPeopleSuccess(json[0].entry)) : null
                })
                .catch(err => diagType === 'All' ? dispatch(getPeopleFailed(err)) : null)
        })
    }
}

//return long terms diagnosis
export const fetchLongTermFromApi = (pageSize, pageNumber, diagType) => {
    return (dispatch) => {
        dispatch(getPeopleLong())
        getUserId().then((data) => {
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber
            getAllDiagnosis(queryString)
                .then(data => data.json())
                .then(json => {
                    json[0].hasOwnProperty('entry') && diagType === 'Not' ? dispatch(getPeopleLongSuccess(json[0].entry)) : null
                })
                .catch(err => diagType === 'Not' ? dispatch(getPeopleLongFailed(err)) : null)
        })
    }
}


//featch more diagnosis pagination call
export const fetchMorePeopleFromApi = (pageSize, pageNumber, diagType) => {
    return (dispatch) => {
        diagType === 'All' ? dispatch(getPeople()) : dispatch(getPeopleLong())
        getUserId().then((data) => {
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber
            //console.log(queryString)
            getAllDiagnosis(queryString)
                .then(data => data.json())
                .then(json => {
                    //console.log(diagType)
                    if (json != null) {
                        json[0].hasOwnProperty('entry') && diagType === 'All' || diagType === 'Not' ? dispatch(getPeopleMoreSuccess(json[0].entry)) : dispatch(getPeopleLongMoreSuccess(json[0].entry))
                    } else {
                        dispatch(getpeoplFinshed())
                    }
                })
                .catch(err => diagType === 'All' ? dispatch(getPeopleFailed(err)) : dispatch(getPeopleLongFailed(err)))
        })
    }
}


//featch more diagnosis pagination call
export const fetchLongMorePeopleFromApi = (pageSize, pageNumber, diagType) => {
    return (dispatch) => {
        dispatch(getPeopleLong())
        getUserId().then((data) => {
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber
           // console.log('For Long: '+queryString)
            getAllDiagnosis(queryString)
                .then(data => data.json())
                .then(json => {
                    //console.log(diagType)
                    if (json != null) {
                        json[0].hasOwnProperty('entry') && diagType === 'Not' ? dispatch(getPeopleLongMoreSuccess(json[0].entry)) : null
                    } else {
                        dispatch(getPeopleLongFinshed())
                    }
                })
                .catch(err => diagType === 'Not' ? dispatch(getPeopleLongFailed(err)) : null)
        })
    }
}




//ALL DIAGNOSIS LOADS HERE
const getPeople = () => {
    return {
        type: FETCHING_PEOPLE
    }
}

const getPeopleSuccess = (data) => {
    return {
        type: FETCHING_PEOPLE_SUCCESS,
        data,
    }
}

const getPeopleMoreSuccess = (data) => {
    return {
        type: FETCHING_PEOPLE_SUCCESS_MORE,
        data,
    }
}

const getPeopleFailed = () => {
    return {
        type: FETCHING_PEOPLE_FAILURE
    }
}

const getpeoplFinshed = () => {
    return null;
}



//ALL LONG TERM DIAGNOSIS GOES HERE
const getPeopleLong = () => {
    return {
        type: FETCHING_LONGTERM_PEOPLE
    }
}

const getPeopleLongSuccess = (payload) => {
    return {
        type: FETCHING_LONGTERM_PEOPLE_SUCCESS,
        payload,
    }
}

const getPeopleLongMoreSuccess = (payload) => {
    return {
        type: FETCHING_LONGTERM_PEOPLE_SUCCESS_MORE,
        payload,
    }
}

const getPeopleLongFailed = () => {
    return {
        type: FETCHING_LONGTERM_PEOPLE_FAILURE
    }
}

const getPeopleLongFinshed = () => {
    return null;
}
