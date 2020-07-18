import { GETING_REPORTS , GETING_REPORTS_SUCCESS , GETING_REPORTS_FAILURE } from "../constants/Constant";
import getPaitentReports from "../services/ReportsService";
import getUserId from "../core/GetToken";


export const fetchReportsFromApi = (token, pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getReports())

        getUserId().then((data) => {
            // console.log(data);
            // token = data
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber;
            getPaitentReports(queryString)
                .then(data => data.json())
                .then(json => {
                    console.log(json)
                    dispatch(getReportsSuccess(json[0].entry))
                })
                .catch(err => dispatch(getReportsFailed(err)))
        })


    }
}



//start getting data
const getReports = () => {
    return{
        type: GETING_REPORTS
    }
}


//data success
const getReportsSuccess = (data) => {
    return{
        type: GETING_REPORTS_SUCCESS,
        data
    }
}


//data failed
const getReportsFailed = () => {
    return{
        type: GETING_REPORTS_FAILURE
    }
}