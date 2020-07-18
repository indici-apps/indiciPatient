import  * as base from '../core/BaseServices';

//service uri
const serviceUri = 'Patient/GetPatientPortalMedication';

const getAllMedications = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getAllMedications;