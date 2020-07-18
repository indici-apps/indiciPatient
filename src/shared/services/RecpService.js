import  * as base from '../core/BaseServices';

//service uri
const serviceUri = 'Patient/GetMessagingRecipients';

const getPatientRecp = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getPatientRecp;