import  * as base from '../core/BaseServices';

//service uri
const serviceUri = 'Patient/GetPatientPortalTimeline';

const getPaitentTimeline = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getPaitentTimeline;