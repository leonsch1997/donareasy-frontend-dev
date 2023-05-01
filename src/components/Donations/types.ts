export interface Donacion {
  id: number;
  donante: Donante;
  cod_estado: number;
  bienes: Bien[];
}

export interface DonacionMonetaria {
  institucion: number;
  monto: string;
}

export enum TipoBien {
  // Reemplazar por nombres descriptivos y consultar de eliminar los no necesarios (NN)
  cero = 1,
  uno,
  dos,
  tres,
}

export interface Bien {
  id:	number;
  tipo:	TipoBien;
  nombre:	string;
  descripcion: string;
  cantidad: number;
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

export interface DonationsListProps {
  list: Donacion[];
}

export interface DonationItemProps {
  item: Donacion;
} 