import  * as base from '../core/BaseServices';

//service uri
const serviceUri = 'Patient/GetPatientPortalImmunization';

const getAllImmune = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getAllImmune;