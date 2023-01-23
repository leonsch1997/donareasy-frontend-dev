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