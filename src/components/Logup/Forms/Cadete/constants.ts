import * as c from '../../../constants';

import { FieldData, UserFields } from '../../types';
import { CadeteEntFields } from './types';

export const userFields: FieldData[] = [
  { name: 'username', label: c.l_usuario, placeholder: c.p_usuario, isRequired: true },
  { name: 'password', label: c.l_password, dataType: c.password, isRequired: true },
  { name: 'email', label: c.l_correo, placeholder: c.p_correo, dataType: 'email', isRequired: true },
];

export const cadeteFields: FieldData[] = [
  { name: 'first_name', label: c.l_nombre, isRequired: true },
  { name: 'last_name', label: c.l_apellido, isRequired: true },
  { name: c.pais, label: c.l_pais },
  { name: c.provincia, label: c.l_provincia },
  { name: c.localidad, label: c.l_localidad },
  { name: c.domicilio, label: c.l_domicilio },
  { name: c.telefono, label: c.l_telefono },
  { name: c.dni, label: c.l_dni, isRequired: true },
  { name: c.fecha_nacimiento, label: c.l_fecha_nacimiento, isRequired: true },
  { name: c.estado_civil, label: c.l_estado_civil },
  { name: c.genero, label: c.l_genero },
  { name: c.ocupacion, label: c.l_ocupacion },
  { name: c.medio_transporte, label: c.l_medio_transporte },
];

export const initialValues: CadeteEntFields & UserFields = {
  // User
  username: '',
  password: '',
  email: '',
  //Cadete
  first_name: '',
  last_name: '',
  dni: '',
  domicilio: '',
  localidad: '',
  provincia: '',
  pais: '',
  telefono: '',
  fecha_nacimiento: '',
  estado_civil: '',
  genero: '',
  ocupacion: '',
  medio_transporte: '',
};
