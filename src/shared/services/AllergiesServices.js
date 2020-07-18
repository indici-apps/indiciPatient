import * as base from '../core/BaseServices'

//set service uri
const serviceUri = 'Patient/GetPatientPortalAllergy';

//return query string
const getAllergies = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getAllergies;