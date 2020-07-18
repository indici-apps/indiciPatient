import { GETTING_RESOURCES, GETTING_RESOURCES_SUCCESS, GETTING_RESOURCES_FAILED } from "../constants/Constant";
import getPaitentResources from "../services/ResourcesService";
import getUserId from "../core/GetToken";
//function will return data
export const fetchResourcesFromApi = (token, pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(getResources())

        getUserId().then((data) => {
            // console.log(data);
            // token = data
            const queryString = '?Token=' + data + '&PatientID=17308&PageSize=' + pageSize + '&PageNumber=' + pageNumber;
            getPaitentResources(queryString)
                .then(data => data.json())
                .then(json => {
                    console.log(json)
                    dispatch(getResourcesSuccess(json[0].entry))
                })
                .catch(err => dispatch(getResourcesFailed(err)))
        })


    }
}
const getResources = () => {
    return {
        type: GETTING_RESOURCES
    }
}

const getResourcesSuccess = (data) => {
    return {
        type: GETTING_RESOURCES_SUCCESS,
        data,
    }
}

const getResourcesFailed = () => {
    return {
        type: GETTING_RESOURCES_FAILED
    }
}