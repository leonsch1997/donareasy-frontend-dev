import { FieldData } from './Logup/types';

export const wrongCredentialsError = 'Usuario o contraseña incorrectos, por favor revise las credenciales';

// Form field names:
export const usuario = 'usuario';
export const password = 'password';
export const institucion = 'institucion';
export const correo = 'correo';
export const nombre = 'nombre';
export const apellido = 'apellido';
export const fecha_nacimiento = 'fecha_nacimiento';
export const dni = 'dni';
export const domicilio = 'domicilio';
export const localidad = 'localidad';
export const provincia = 'provincia';
export const pais = 'pais';
export const telefono = 'telefono';
export const estado_civil = 'estado_civil';
export const genero = 'genero';
export const ocupacion = 'ocupacion';

// Form field labels:
export const l_usuario = 'Usuario';
export const l_password = 'Contraseña';
export const l_institucion = 'Es institución';
export const l_correo = 'Correo';
export const l_nombre = 'Nombre';
export const l_apellido = 'Apellido';
export const l_fecha_nacimiento = 'Fecha de nacimiento';
export const l_dni = 'Número de documento (DNI)';
export const l_domicilio = 'Domicilio';
export const l_localidad = 'Localidad';
export const l_provincia = 'Provincia';
export const l_pais = 'País natal';
export const l_telefono = 'Teléfono';
export const l_estado_civil = 'Estado civil';
export const l_genero = 'Género';
export const l_ocupacion = 'Ocupación';

// Form field placeholders:
export const p_usuario = 'nik_donareasy';
export const p_institucion = 'Donareasy Centro';
export const p_correo = 'nik_don@gmail.com';

export const userFields: FieldData[] = [
  { name: usuario, label: l_usuario, placeholder: p_usuario, isRequired: true },
  { name: password, label: l_password, dataType: password, isRequired: true },
  { name: correo, label: l_correo, placeholder: p_correo, dataType: 'email', isRequired: true },
];

export const donanteFields: FieldData[] = [
  { name: nombre, label: l_nombre, isRequired: true },
  { name: apellido, label: l_apellido, isRequired: true },
  { name: fecha_nacimiento, label: l_fecha_nacimiento, dataType: 'date' },
  { name: dni, label: l_dni },
  { name: domicilio, label: l_domicilio },
  { name: pais, label: l_pais },
  { name: provincia, label: l_provincia },
  { name: localidad, label: l_localidad },
  { name: telefono, label: l_telefono },
  { name: estado_civil, label: l_estado_civil },
  { name: genero, label: l_genero },
  { name: ocupacion, label: l_ocupacion },
];

export const adminFields: FieldData[] = []; // Should be imported from other place

export const institucionFields: FieldData[] = [];

export const cadeteFields: FieldData[] = [];
interface FormFields {
  user: FieldData[];
  admin: FieldData[];
  institucion: FieldData[];
  donante: FieldData[];
  cadete: FieldData[];
}

export const formFields: FormFields = {
  user: userFields,
  admin: adminFields,
  institucion: institucionFields,
  donante: donanteFields,
  cadete: cadeteFields,
}