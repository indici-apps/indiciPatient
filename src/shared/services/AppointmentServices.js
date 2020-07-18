import  * as base from '../core/BaseServices';

//service uri
const serviceUri = 'Patient/GetPatientPortalAppointments';

const getPaitentAppointments = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getPaitentAppointments;