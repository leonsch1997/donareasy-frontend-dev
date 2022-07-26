import { FormControl, FormLabel, FormErrorMessage, Input, Checkbox, VStack, HStack } from '@chakra-ui/react';
import { Field } from 'formik';
import { FieldData } from './types';

export const createField = ({ name, label, placeholder, dataType, isRequired }: FieldData & { isRequired?: boolean }) => {
  if (dataType === 'checkbox') return (
    <HStack mb={'8'}>
      <Field name={name}>
        {({ form }: any) => (
          <FormControl isInvalid={form.errors.username && form.touched.username}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            Si <Checkbox size={'lg'} width={'100%'}/>
            No <Checkbox size={'lg'} width={'100%'} defaultChecked={true} />
          </FormControl>
        )}
      </Field>
    </HStack>
  )

  return (
    <VStack mb={'8'}>
      <Field name={name}>
        {({ field, form }: any) => (
          <FormControl isInvalid={form.errors.username && form.touched.username}>
            <FormLabel htmlFor={name}>{label}{isRequired && <span style={{ color: 'red' }}>{' *'}</span>}</FormLabel>
            <Input type={dataType} {...field} id={name} placeholder={placeholder} />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </VStack>
  );
};
