import { UserFields } from "../../types";

export interface CadeteEntFields {
  fecha_nacimiento: string;
  dni: string;
  domicilio: string;
  localidad: string;
  provincia: string;
  pais: string;
  telefono: string;
  estado_civil: string;
  genero: string;
  ocupacion: string;
  medio_transporte: string;
}

export type CadeteFormSubmitFields = CadeteEntFields & UserFields;

export interface CadeteFormattedValues extends CadeteEntFields {
  usuario: UserFields;
  nombre: string;
  apellido: string;
}
