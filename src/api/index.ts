export const baseURL = 'http://localhost:8000';

export const endpoints = {
  login: `${baseURL}/home/login/`,
  logup: `${baseURL}/home/logup/`,
  logout: `${baseURL}/home/logout/`,
  donantes: `${baseURL}/home/models/donantes/`,
  cadetes: `${baseURL}/home/models/cadetes/`,
  institucionesCBU: `${baseURL}/donaciones/eligeInstitucionConCBU/`,
  instituciones: `${baseURL}/donaciones/eligeInstitucion/`,
  noticias: `${baseURL}/noticias/`,
  donacionesPendientes: `${baseURL}/donaciones/donacionesPendientes/`,
  transferenciasPendientes: `${baseURL}/donaciones/transferenciasPendientes/`,
  listadoDonaciones: `${baseURL}/donaciones/listadoDonaciones/`,
  aceptarDonacion: (id: string) => `${baseURL}/donaciones/donacionesPendientes/${id}/aceptar/`,
  rechazarDonacion: (id: string) => `${baseURL}/donaciones/donacionesPendientes/${id}/rechazar/`,
  donacionBien: `${baseURL}/donaciones/eligeInstitucion/donarBienes/`,
  donacionMonetaria: `${baseURL}/donaciones/donarDinero/`,
  cancelarDonacion: (id: string) => `${baseURL}/donaciones/cancelarDonacion/${id}/`
}
