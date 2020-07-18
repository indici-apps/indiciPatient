import  * as base from '../core/BaseServicesPost';

//service uri
const serviceUri = 'Patient/CancelAppointment';

const cancelPatientAppointment = (queryString) => base.post(`${serviceUri}${queryString}`);
export default cancelPatientAppointment;