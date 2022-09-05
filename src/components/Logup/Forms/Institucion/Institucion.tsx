import axios from 'axios';
import { Button,Center, Heading } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';

import { endpoints } from '../../../../api';
import { UserFields } from '../../types';
import { InstitucionEntFields } from './types';
import { institucionFields, userFields, initialValues } from './constants';
import { createField, formatLogupFormData, validateUserFields } from '../../utils';

export const InstitucionForm = () => {
  const fields = [...userFields, ...institucionFields];

  const handleSubmit = async (formValues: InstitucionEntFields & UserFields, actions: FormikHelpers<InstitucionEntFields & UserFields>) => {
    const erroredFields = validateUserFields(formValues);
    if (erroredFields.length <= 0) {
      try {
        const formattedData = formatLogupFormData('institucion', formValues);
        const res = await axios.post(`${endpoints['logup']}/institucion/`, formattedData).then((res) => res.data);
        console.log('Registro existoso' , res)
        console.log(formattedData);
      } catch (e) {
        console.log(e)
      }
    } else {
      erroredFields.forEach(({ name }) => {
        actions.setFieldError(name, `${name}-has an error`)
      })
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          {fields.slice(0,userFields.length).map((fieldData, idx) => createField({...fieldData, idx }))}
          {fields.length > 5 && (
            <>
              <Heading as='h4' size='md' textAlign='center' mb={5}>
                Datos Institucionales
              </Heading>
              {fields.slice(userFields.length,).map((fieldData) => createField({...fieldData }))}
            </>
          )}

          <Center>
            <Button
              mt={4}
              colorScheme='pink'
              type='submit'
              isLoading={isSubmitting}
            >
              Registrarse
            </Button>
          </Center>
        </Form>
      )}
    </Formik>
  )
}
