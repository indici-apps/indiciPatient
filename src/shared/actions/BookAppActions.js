import { BOOK_APP , BOOK_APP_SUCCESS , BOOK_APP_FAIL, BOOK_APP_CLEANUP  } from "../constants/Constant";
import getAvSlots from "../services/BookAppService";
import getUserId from "../core/GetToken";

//function will return data
export const fetchTestAllergy = (passingDate) => {
    return (disptach) => {
        console.log("Date in here"+passingDate)
        disptach(getApp())
        getUserId().then((data) => {
            // token = data
            const queryString = '?Token='+data+'&PatientID=17308&ScheduleDate='+passingDate;
            getAvSlots(queryString)
                .then(data => data.json())
                .then(json => {
                   //console.log("DATA FOUND: ", json)
                    disptach(getAppSuccess(json[0].entry))
                })
                .catch(err => disptach(getAppFail(console.log(err))))
        })

    }
}

export const clenupbooking = () => {
    return (disptach) => {
        disptach(getAppCleanUp())
    }
}



const getApp = () =>{
    return{
        type: BOOK_APP
    }
}

//data success
const getAppSuccess = (data) => {
    return {
        type: BOOK_APP_SUCCESS,
        data,
    }
}

//data failed
const getAppFail = () => {
    return {
        type: BOOK_APP_FAIL
    }
}

const getAppCleanUp = () => {
    return {
        type: BOOK_APP_CLEANUP
    }
}


