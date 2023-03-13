// routes
//TODO agregar pagina inicial despues del login
// import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API_KEY = process.env.HOST_API_KEY || "";

export const NUTRINA_API = {
  apiUsers: process.env.NEXT_PUBLIC_AUTH_URL_BASE,
  apiNutrina: process.env.NEXT_PUBLIC_NUTRINA_URL_BASE,
};
// ROOT PATH AFTER LOGIN SUCCESSFUL
// export const PATH_AFTER_LOGIN = PATH_DASHBOARD.one;
