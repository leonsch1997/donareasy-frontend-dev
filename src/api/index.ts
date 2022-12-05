export const baseURL = 'http://localhost:8000';

export const endpoints = {
  login: `${baseURL}/home/login/`,
  logup: `${baseURL}/home/logup`,
  donantes: `${baseURL}/home/models/donantes/`,
  cadetes: `${baseURL}/home/models/cadetes/`,
  institucionesCBU: `${baseURL}/donaciones/eligeInstitucionConCBU/`,
  instituciones: `${baseURL}/donaciones/eligeInstitucion/`,
}
