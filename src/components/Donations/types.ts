interface Base {
  idInstitucion: string;
  tipoDonacion: string;
  sortId: string;
}

export interface DonacionBienItem extends Base {
  tipoBien: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
}

export interface DonacionMontoItem extends Base {
  amount: string;
}

export enum TiposBien {
  alimento = 1,
  util,
  prenda,
  otro,
}