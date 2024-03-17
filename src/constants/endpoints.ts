const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

// Auth
export const EP_LOGIN = `${BASE_URL}/auth/login`;

// Services
export const EP_SERVICES_TYPE = `${BASE_URL}/services/type`;

// Regions
export const EP_REGIONS_COUNTRY = `${BASE_URL}/regions/country`;
export const EP_REGIONS_MUNICIPALITY = `${BASE_URL}/regions/municipality`;
