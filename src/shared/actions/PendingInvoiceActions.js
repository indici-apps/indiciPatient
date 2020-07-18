import { GET_PENDING_INVOICES , GET_PENDING_INVOICES_SUCCESS , GET_PENDING_INVOICES_MORE_SUCCESS, GET_PENDING_INVOICES_FAIL  } from "../constants/Constant";
import getUserInvoice from "../services/InvoiceService";
import getUserId from "../core/GetToken";


export const fetchPendingInvoiceFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getPendingInvoice())
        getUserId().then((data) => {
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber +'&TransactionTypeID=1'
            getUserInvoice(queryString)
                .then(data => data.json())
                .then(json => {
                    console.log('Hello:', json)
                     json[0].hasOwnProperty('entry') ? dispatch(getPendingInvoiceSuccess(json[0].entry)) : dispatch(getPendingInvoiceFinsihed())
                })
                .catch(err => dispatch(getPendingInvoiceFail(err)))
        })
    }
}


export const fetchMorePendingInvoiceFromApi = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getPendingInvoice())
        getUserId().then((data) => {
            //fetch('https://stagingindiciconnect.itsmyhealth.nz/api/?Tozken=c72bf947-4549-4d0d-b7de-141617e52b87&PatientID=2255013&PageSize=10&PageNumber=1', requestOptions)
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber +'&Type=1&MessagingType=1'
            getPaitentMsg(queryString)
                .then(data => data.json())
                .then(json => {
                    json[0].hasOwnProperty('entry') ? dispatch(getPendingInvoiceMoreSuccess(json[0].entry)) : dispatch(getPendingInvoiceFinsihed())
                })
                .catch(err => dispatch(getPendingInvoiceFail(err)))
        })
    }
}




const getPendingInvoice = () =>{
    return{
        type: GET_PENDING_INVOICES
    }
}

//data success
const getPendingInvoiceSuccess = (data) => {
    return {
        type: GET_PENDING_INVOICES_SUCCESS,
        data,
    }
}

const getPendingInvoiceMoreSuccess = (data) => {
    return {
        type: GET_PENDING_INVOICES_MORE_SUCCESS,
        data,
    }
}

//data failed
const getPendingInvoiceFail = () => {
    return {
        type: GET_PENDING_INVOICES_FAIL
    }
}

const getPendingInvoiceFinsihed = () => {
    return null;
}


