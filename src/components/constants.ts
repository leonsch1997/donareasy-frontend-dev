import { FieldData } from './Logup/types';

export const wrongCredentialsError = 'Usuario o contraseña incorrectos, por favor revise las credenciales';

// Form field names:
export const username = 'username';
export const password = 'password';
export const institution = 'institution';
export const email = 'email';
export const name = 'first_name';
export const nombre = 'nombre';
export const apellido = 'apellido';
export const lastname = 'last_name';
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
export const l_username = 'Usuario';
export const l_password = 'Contraseña';
export const l_institution = 'Es institución';
export const l_email = 'Correo';
export const l_name = 'Nombre';
export const l_lastname = 'Apellido';
export const l_nombre = l_name;
export const l_apellido = l_lastname;
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
export const p_username = 'nik_donareasy';
export const p_institution = 'Donareasy Centro';
export const p_email = 'nik_don@gmail.com';

export const userFields: FieldData[] = [
  { name: username, label: l_username, placeholder: p_username, isRequired: true },
  { name: password, label: l_password, dataType: password, isRequired: true },
  { name: email, label: l_email, placeholder: p_email, dataType: email, isRequired: true },
];

export const donorFields: FieldData[] = [
  { name: nombre, label: l_nombre, isRequired: true },
  { name: apellido, label: l_apellido, isRequired: true },
  { name: fecha_nacimiento, label: l_fecha_nacimiento },
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

export const institutionFields: FieldData[] = [];

interface FormFields {
  user: FieldData[];
  admin: FieldData[];
  institution: FieldData[];
  donor: FieldData[];
}

export const formFields: FormFields = {
  user: userFields,
  admin: adminFields,
  institution: institutionFields,
  donor: donorFields,
}