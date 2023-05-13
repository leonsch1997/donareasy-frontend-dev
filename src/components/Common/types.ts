import { HTMLInputTypeAttribute } from "react";
export interface DonationModalProps {
  item: Donation;
  isOpen: boolean;
  onClose: () => void;
}

export interface FieldData {
  name: string;
  label: string;
  placeholder?: string;
  dataType?: HTMLInputTypeAttribute;
  isRequired?: boolean;
  idx?: string | number;
}

export interface RejectDonationFields {
  motivo_cancelacion: string;
}

export interface RejectDonationFormValues {
  motivo_cancelacion: string;
}

export interface Donation {
  id: string;
  donante: Donante;
  institucion: Institucion;
  cod_estado: number;
  bienes: Bien[];
  monto?: number | string;
  fecha_transferencia: string;
}

export interface Bien {
  fecha_creacion: string;
  fecha_aceptacion?: string;
  fecha_entrega_real?: string;
  cod_estado: number;
  donante_id: number;
  institucion_id: number;
  id: number;
  tipo: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
}

export enum DonationStates {
  Cancelada = 0,
  Pendiente,
  Aceptada,
  Agendada = 5,
  Entregada
}

export enum MoneyDonationStates {
  Cancelada = 0,
  Pendiente = 3,
  Aceptada = 4,
}

export interface Donante {
  id:	number;
  nombre:	string
  apellido:	string
  fecha_nacimiento?:	string; // NN
  dni: string;
  domicilio: string;
  localidad: string;
  provincia: string;
  pais:	string;
  telefono:	string;
  estado_civil?: string; // NN
  genero:	string;
  ocupacion?: string; // NN
  usuario: number;
}

export interface Institucion {
  id: number;
  nombre: string;
  director: string;
  domicilio: string;
  localidad: string;
  telefono: string;
  cant_empleados: number;
  descripcion: string;
  cbu: string;
} 