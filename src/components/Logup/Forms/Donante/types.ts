import { UserFields } from "../../types";

export interface DonantePersonalFields {
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

export type DonanteFormSubmitFields = DonantePersonalFields & UserFields;

export interface DonanteFormattedValues extends DonantePersonalFields {
  usuario: UserFields;
}
