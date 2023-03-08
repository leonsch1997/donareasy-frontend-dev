export interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FieldData {
  name: string;
  label: string;
  placeholder?: string;
  dataType?: string;
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