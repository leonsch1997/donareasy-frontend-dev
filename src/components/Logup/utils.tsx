import { FormControl, FormLabel, FormErrorMessage, Input, Checkbox, VStack, HStack } from '@chakra-ui/react';
import { Field } from 'formik';
import { FieldData, LogupFormValues, UserType } from './types';
import { DonanteFormattedValues, DonanteFormSubmitFields } from './Forms/Donante/types';
import { InstitucionFormSubmitFields, institucionFormattedValues } from './Forms/Institucion/types';
import { CadeteFormSubmitFields, CadeteFormattedValues } from './Forms/Cadete/types';

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

export const validateUserFields = (formValues: any) => {
  return [];
};

export const formatLogupFormData = (userType: UserType, data: LogupFormValues) => {
  if (userType === 'institucion') {
    const { username, first_name, last_name, email, password, ...rest } = data as InstitucionFormSubmitFields;

    const formattedValues: institucionFormattedValues = {
      usuario: {
        username,
        first_name,
        last_name,
        email,
        password,
      },
      ...rest,
    };

    return formattedValues;
  }

  if (userType === 'donante') {
    const { username, first_name, last_name, email, password, ...rest } = data as DonanteFormSubmitFields;
    const formattedValues: DonanteFormattedValues = {
      usuario: {
        username,
        first_name: rest.nombre,
        last_name: rest.apellido,
        email,
        password,
      },
      ...rest,
    };

    return formattedValues;
  }
  
  if (userType === 'cadete') {
    const { username, first_name, last_name, email, password, ...rest } = data as CadeteFormSubmitFields;
    const formattedValues: CadeteFormattedValues = {
      usuario: {
        username,
        first_name,
        last_name,
        email,
        password,
      },
      nombre: first_name,
      apellido: last_name,
      ...rest,
    };

    return formattedValues;
  }

  else {
    return {};
  }
};
