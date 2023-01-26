import { FieldData } from "./types";

const l_motivo = 'Motivo'
const p_motivo = 'Motivo pleisjolder'

export const bodyTypes = {
    select: 'select',
    reject: 'reject'
  }

  export const initialValues = {
    motivo_cancelacion: 'Ingrese un motivo Aquí!'
  };
  
  export const rejectDonationFields: FieldData[] = [
    { name: 'motivo_cancelacion', label: l_motivo, placeholder: p_motivo, isRequired: true },
  ];