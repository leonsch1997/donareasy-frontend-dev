import axios from 'axios';
import { Button,Center, Heading } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';

import { endpoints } from '../../../../api';
import { UserFields } from '../../types';
import { CadeteEntFields } from './types';
import { cadeteFields, userFields, initialValues } from './constants';
import { createField, formatLogupFormData, validateUserFields } from '../../utils';

export const CadeteForm = () => {
  const fields = [...userFields, ...cadeteFields];

  const handleSubmit = async (formValues: CadeteEntFields & UserFields, actions: FormikHelpers<CadeteEntFields & UserFields>) => {
    const erroredFields = validateUserFields(formValues);
    if (erroredFields.length <= 0) {
      try {
        const formattedData = formatLogupFormData('cadete', formValues);
        await axios.post(`${endpoints['logup']}/cadete/`, formattedData).then((res) => res.data);
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
                Datos personales cadete
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
