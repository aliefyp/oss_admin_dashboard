const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

// Auth
export const EP_LOGIN = `${BASE_URL}/auth/login`;
export const EP_REFRESH_TOKEN = `${BASE_URL}/auth/refresh-token`;
export const EP_FORGET_PASSWORD = `${BASE_URL}/auth/forget-password`;
export const EP_RESET_PASSWORD = `${BASE_URL}/auth/reset-password`;

// Services
export const EP_SERVICES_TYPE = `${BASE_URL}/services/type`;
export const EP_SERVICES = `${BASE_URL}/services`;

// Regions
export const EP_REGIONS_COUNTRY = `${BASE_URL}/regions/country`;
export const EP_REGIONS_MUNICIPALITY = `${BASE_URL}/regions/state`;

// Applications
export const EP_APPLICATIONS = `${BASE_URL}/applications`;

// Appointments
export const EP_APPOINTMENTS = `${BASE_URL}/appointments`;

// Files
export const EP_FILES = `${BASE_URL}/files`;

// Options
export const EP_OPTIONS = `${BASE_URL}/options`;

// Issued Cards
export const EP_ISSUED_CARDS = `${BASE_URL}/issued-cards`;

// Dashboard
export const EP_DASHBOARD = `${BASE_URL}/dashboard`;

// Me
export const EP_LOGS = `${BASE_URL}/me/logs`;

// Officer
export const EP_OFFICERS = `${BASE_URL}/officers`;

// Organizations
export const EP_ORGANIZATIONS = `${BASE_URL}/organizations`;

// Zendesk
export const EP_ZENDESK = `${BASE_URL}/zendesk`;