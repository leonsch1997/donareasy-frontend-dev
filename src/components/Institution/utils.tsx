import { FormControl, FormLabel, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import { Field } from 'formik';
import { Donation } from './types';
import { FieldData, RejectDonationFields, RejectDonationFormValues } from './types';

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

export const getDonations = () => {
  const descripcion = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
  const sinAceptar: Donation = {
    fecha_creacion: new Date().toLocaleString(), 
    cod_estado: Math.round(Math.random()), 
    donante_id: 1, 
    institucion_id: 2, 
    id: 1,
    tipo: 2,
    nombre: 'Juguete buzz light year',
    descripcion,
    cantidad: 3,
  };
  const aceptadaSinEntrega: Donation = {
    ...sinAceptar,
    fecha_aceptacion: new Date().toLocaleString(),
  };
  const aceptadaEntregada: Donation = {
    ...aceptadaSinEntrega,
    fecha_entrega_real: new Date().toLocaleString(),
  };

  return [sinAceptar, aceptadaEntregada, aceptadaSinEntrega];
}