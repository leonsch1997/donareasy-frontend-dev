export interface FieldData {
  name: string;
  label: string;
  placeholder?: string;
  dataType?: string;
  isRequired?: boolean;
}
export type UserType = 'donante' | 'admin' | 'cadete' | 'institucion' | 'user';
export interface UserFormValues { // should not be filled on forms. Only for nested objects
  username: string;
  password: string;
  email: string;
  first_name?: string;
  last_name?: string;
}
export interface DonorFormValues extends UserFormValues {
  usuario: string;
  nombre: string;
  correo: string;
  apellido: string;
  fecha_nacimiento: string;
  dni: string;
  domicilio: string;
  pais: string;
  provincia: string;
  localidad: string;
  telefono: string;
  estado_civil: string;
  genero: string;
  ocupacion: string;
}

export interface DonorAndUserMergedTypes extends Omit<DonorFormValues, 'usuario' | 'correo'> {
  usuario: UserFormValues;
}

export interface InstitutionFormValues extends UserFormValues {
  iv: string;
}

export interface AdminFormValues extends UserFormValues {
  av: string;
}

export type LogupFormValues = DonorFormValues | InstitutionFormValues | AdminFormValues;
