import  * as base from '../core/BaseServices';


//service endpoint
const serviceUri = 'Patient/GetPatientPortalDiagnosis';

//export query
const getAllDiagnosis = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getAllDiagnosis;