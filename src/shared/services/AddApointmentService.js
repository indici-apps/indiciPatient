import  * as base from '../core/BaseServicesPost';

//service uri
const serviceUri = 'Patient/AddAppointment';

const addPatientAppointment = (queryString) => base.post(`${serviceUri}${queryString}`);
export default addPatientAppointment;