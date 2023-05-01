import { FormControl, FormLabel, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import { Field } from 'formik';
import { DonationStates, FieldData, MoneyDonationStates, RejectDonationFields, RejectDonationFormValues } from './types';

export const createField = ({ name, label, placeholder, dataType, isRequired, idx }: FieldData & { isRequired?: boolean }) => {
  return (
    <VStack key={`${name}-${idx}`} mb={'8'}>
      <Field name={name}>
        {({ field, form }: any) => {
          return (
            <FormControl isInvalid={form.errors[`${name}`] && form.touched[`${name}`]}>
              <FormLabel htmlFor={name}>{label}{isRequired && <span style={{ color: 'red' }}>{' *'}</span>}</FormLabel>

              <Input isRequired={isRequired} type={dataType} {...field} id={name} placeholder={placeholder} />

              <FormErrorMessage>{form.errors[`${name}`]}</FormErrorMessage>
            </FormControl>
          )}
        }
      </Field>
    </VStack>
  );
};

export const validateRejectDonationFields = (formValues: any) => {
  return [];
};

export const formatRejectDonationFormData = (data: RejectDonationFormValues) => {
  const { motivo_cancelacion } = data;
  const formattedValues: RejectDonationFields = { motivo_cancelacion };

  return formattedValues;
};

export const getBoxColor = (
  stateCode: DonationStates | MoneyDonationStates,
  isMoneyDonation: boolean
) => {
  // Se podría reutilizar si tuviese todo el mismo codigo pero no es el caso.
  if (isMoneyDonation) {
    switch (stateCode) {
      case MoneyDonationStates.Pendiente:
        return "yellow.50";
      case MoneyDonationStates.Aceptada:
        return "teal.50";
      case MoneyDonationStates.Cancelada:
        return "pink.50";
    }
  } else {
    switch (stateCode) {
      case DonationStates.Aceptada:
        return "teal.50";
      case DonationStates.Cancelada:
        return "pink.50";
      case DonationStates.Agendada:
        return "gray.50";
      case DonationStates.Pendiente:
        return "yellow.50";
      case DonationStates.Entregada:
        return "green.50";
    }
  }
};