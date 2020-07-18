import  * as base from '../core/BaseServices';

//service uri
const serviceUri = 'Patient/GetAccounts';
const getUserInvoice = (queryString) => base.get(`${serviceUri}${queryString}`);
export default getUserInvoice;