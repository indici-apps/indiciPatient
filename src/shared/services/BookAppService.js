import  * as base from '../core/BaseServices';

//service uri
const serviceUri = 'Patient/GetAppointmentSlots';

const getAvSlots = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getAvSlots;