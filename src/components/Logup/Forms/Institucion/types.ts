import { UserFields } from '../../types';

export interface InstitucionEntFields {
  nombre: string;
  director: string;
  fecha_fundacion: string;
  domicilio: string;
  localidad: string;
  provincia: string;
  pais: string;
  telefono: string;
  cant_empleados: number;
  descripcion: string;
  cbu: number | null;
  cuenta_bancaria: string;
}

export type InstitucionFormSubmitFields = InstitucionEntFields & UserFields;

export interface institucionFormattedValues extends InstitucionEntFields {
  usuario: UserFields;
}
