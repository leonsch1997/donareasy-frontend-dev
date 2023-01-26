import { RejectDonationFields, RejectDonationFormValues } from "./types";
import { FormControl, FormLabel, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import { Field } from 'formik';
import { FieldData } from './types';

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
    const { motivo_cancelacion, ...rest } = data;

    const formattedValues: RejectDonationFields = {
        motivo_cancelacion,
    };

    return formattedValues;
  };

//Función  que obtuve en internet para hacer funcionar el PUT de los endpoints
// https://www.appsloveworld.com/django/100/408/react-django-csrf-token-missing-or-incorrect
export const getCookie = (name: any) => {
    var cookieValue = '';
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  };