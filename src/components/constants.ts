import { FieldData, UserType } from './Logup/types';

export const wrongCredentialsError = 'Usuario o contraseña incorrectos, por favor revise las credenciales';
export const csrftoken = 'csrftoken';

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
export const medio_transporte = 'medio_transporte';
export const director = 'director';
export const fecha_fundacion = 'fecha_fundacion';
export const cant_empleados = 'cant_empleados';
export const descripcion = 'descripcion';
export const cbu = 'cbu';
export const cuenta_bancaria = 'cuenta_bancaria';

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
export const l_medio_transporte = 'Medio de transporte';
export const l_director = 'Director de la institución';
export const l_fecha_fundacion = 'Fecha de fundación';
export const l_cant_empleados = 'Cantidad de empleados';
export const l_descripcion = 'Descripción de la empresa';
export const l_cbu = 'CBU Bancario';
export const l_cuenta_bancaria = 'Cuenta bancaria';
export const l_tipo_usuario = 'Tipo de usuario';

// Form field placeholders:
export const p_usuario = 'nik_donareasy';
export const p_institucion = 'Donareasy Centro';
export const p_correo = 'nik_don@gmail.com';
export const p_medio_transporte = "Auto | Moto | Bicicleta | Otro";

export const userTypeOptions: UserType[] = ['donante', 'cadete', 'institucion'];

export const userFields: FieldData[] = [
  { name: usuario, label: l_usuario, placeholder: p_usuario, isRequired: true },
  { name: password, label: l_password, dataType: password, isRequired: true },
  { name: correo, label: l_correo, placeholder: p_correo, dataType: 'email', isRequired: true },
];

export const institucionFields: FieldData[] = [
  { name: nombre, label: l_nombre, isRequired: true },
  { name: director, label: l_director, isRequired: true },
  { name: fecha_fundacion, label: l_fecha_fundacion, isRequired: true },
  { name: domicilio, label: l_domicilio, isRequired: true },
  { name: localidad, label: l_localidad, isRequired: true },
  { name: provincia, label: l_provincia, isRequired: true },
  { name: telefono, label: l_telefono, isRequired: true },
  { name: cant_empleados, label: l_cant_empleados },
  { name: descripcion, label: l_descripcion },
  { name: cbu, label: l_cbu, isRequired: true },
  { name: cuenta_bancaria, label: l_cuenta_bancaria },
];

export const cadeteFields: FieldData[] = [
  { name: medio_transporte, label: l_medio_transporte },
];

export const formFields: any = {
  user: userFields,
  institucion: institucionFields,
  cadete: cadeteFields,
}