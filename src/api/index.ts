export const baseURL = 'http://localhost:8000';

export const endpoints = {
  login: `${baseURL}/home/login/`,
  logup: `${baseURL}/home/logup/`,
  logout: `${baseURL}/home/logout/`,
  donantes: `${baseURL}/home/models/donantes/`,
  cadetes: `${baseURL}/home/models/cadetes/`,
  institucionesCBU: `${baseURL}/donaciones/eligeInstitucionConCBU/`,
  instituciones: `${baseURL}/donaciones/eligeInstitucion/`,
  chicos: `${baseURL}/apadrinamiento/solicitud/chicos/`,
  noticias: `${baseURL}/noticias/`,
  donacionesPendientes: `${baseURL}/donaciones/donacionesPendientes/`,
  transferenciasPendientes: `${baseURL}/donaciones/transferenciasPendientes/`,
  solicitudApadrinamientoPendientes: `${baseURL}/apadrinamiento/solicitudes/`,
  donacionesDonante: `${baseURL}/donaciones/listadoDonaciones/`,
}
