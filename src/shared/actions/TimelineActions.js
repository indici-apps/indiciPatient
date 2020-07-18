import { GETTING_TIMELINE , GETTING_TIMELINE_SUCCESS , GETTING_TIMELINE_FAILED } from "../constants/Constant";
import getPaitentTimeline from "../services/TimelineService";
import getUserId from "../core/GetToken";


export const fetchTimelineFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getTimeline())
        getUserId().then((data) => {
            //fetch('https://stagingindiciconnect.itsmyhealth.nz/api/?Tozken=c72bf947-4549-4d0d-b7de-141617e52b87&PatientID=2255013&PageSize=10&PageNumber=1', requestOptions)
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber
            getPaitentTimeline(queryString)
                .then(data => data.json())
                .then(json => {
                    console.log('Hello:', json)
                    dispatch(getTimelineSuccess(json[0].entry))
                })
                .catch(err => dispatch(getTimelineFailed(err)))
        })


    }
}


const getTimeline = () =>{
    return{
        type: GETTING_TIMELINE
    }
}

const getTimelineSuccess = (data) => {
    return{
        type: GETTING_TIMELINE_SUCCESS,
        data
    }
}

const getTimelineFailed = () => {
    return{
        type: GETTING_TIMELINE_FAILED
    }
}