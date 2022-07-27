export interface FieldData {
  name: string;
  label: string;
  placeholder?: string;
  dataType?: string;
  isRequired?: boolean;
}

export interface UserFormValues {
  username: string;
  password: string;
  email: string;
}
export interface DonorFormValues extends UserFormValues {
  nombre: string;
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

export interface InstitutionFormValues extends UserFormValues {
  iv: string;
}

export interface AdminFormValues extends UserFormValues {
  av: string;
}

export type LogupFormValues = DonorFormValues | InstitutionFormValues | AdminFormValues;
