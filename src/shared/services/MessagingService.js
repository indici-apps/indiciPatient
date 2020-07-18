import  * as base from '../core/BaseServices';

//service uri
const serviceUri = 'Patient/GetPatientMessaging';

const getPaitentMsg = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getPaitentMsg;