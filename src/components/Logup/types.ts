export interface FieldData {
  name: string;
  label: string;
  placeholder?: string;
  dataType?: string;
  isRequired?: boolean;
  idx?: string | number;
}
export interface UserFields {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export type UserType = 'donante' | 'cadete' | 'institucion' | 'user';

export type LogupFormValues = any;