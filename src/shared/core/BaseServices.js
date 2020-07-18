import Settings from '../config/Settings'


const defaultHeaders = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
}

//expor the dulft get fetch api call

export const get = (endpoint, headers) => (
    fetch(`${Settings.apiUrl}${endpoint}`, {
        method: 'GET',
        headers: headers || defaultHeaders
    })
);

export const getPatientById = () => {}