import  * as base from '../core/BaseServices';

//service uri
const serviceUri = 'Patient/Patient';

const getPatientProfile = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getPatientProfile;