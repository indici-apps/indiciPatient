import  * as base from '../core/BaseServices';

//service uri
const serviceUri = 'Patient/GetPatientPortalResource';

const getPaitentResources = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getPaitentResources;