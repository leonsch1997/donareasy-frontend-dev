import * as c from '../../../constants';

import { FieldData, UserFields } from '../../types';
import { DonantePersonalFields } from './types';

export const userFields: FieldData[] = [
  { name: 'username', label: c.l_usuario, placeholder: c.p_usuario, isRequired: true },
  { name: 'password', label: c.l_password, dataType: c.password, isRequired: true },
  { name: 'email', label: c.l_correo, placeholder: c.p_correo, dataType: 'email', isRequired: true },
];

export const donanteFields: FieldData[] = [
  { name: c.nombre, label: c.l_nombre, isRequired: true },
  { name: c.apellido, label: c.l_apellido, isRequired: true },
  { name: c.fecha_nacimiento, label: c.l_fecha_nacimiento, dataType: 'date' },
  { name: c.dni, label: c.l_dni, isRequired: true },
  { name: c.domicilio, label: c.l_domicilio, isRequired: true },
  { name: c.pais, label: c.l_pais, isRequired: true },
  { name: c.provincia, label: c.l_provincia, isRequired: true },
  { name: c.localidad, label: c.l_localidad, isRequired: true },
  { name: c.telefono, label: c.l_telefono, isRequired: true },
  { name: c.estado_civil, label: c.l_estado_civil },
  { name: c.genero, label: c.l_genero },
  { name: c.ocupacion, label: c.l_ocupacion },
];

export const initialValues: DonantePersonalFields & UserFields = {
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  email: '',
  nombre: '',
  apellido: '',
  fecha_nacimiento: '',
  dni: '',
  domicilio: '',
  pais: '',
  provincia: '',
  localidad: '',
  telefono: '',
  estado_civil: '',
  genero: '',
  ocupacion: '',
};