import  * as base from '../core/BaseServices';

//service uri
const serviceUri = 'Patient/GetPatientPortalResult';

const getPaitentReports = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getPaitentReports;