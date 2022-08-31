// import axios from 'axios';
import { Button,Center, Heading } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';

// import { endpoints } from '../../../../api';
import { UserFields } from '../../types';
import { DonantePersonalFields } from './types';
import { donanteFields, userFields, initialValues } from './constants';
import { createField, formatLogupFormData, validateUserFields } from '../../utils';

export const DonanteForm = () => {
  const fields = [...userFields, ...donanteFields];

  const handleSubmit = async (formValues: DonantePersonalFields & UserFields, actions: FormikHelpers<DonantePersonalFields & UserFields>) => {
    const erroredFields = validateUserFields(formValues);

    if (erroredFields.length <= 0) {
      try {
        const formattedData = formatLogupFormData('donante', formValues);
        // const res = await axios.post(`${endpoints['logup']}/donante/`, formattedData).then((res) => res.data);
        // console.log('Registro existoso' , res)
        console.log(formattedData);
      } catch {
        console.log('Errrrrrrr')
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
          {fields.slice(0,3).map((fieldData, idx) => createField({...fieldData, idx }))}
          {fields.length > 3 && (
            <>
              <Heading as='h4' size='md' textAlign='center' mb={3}>
                Datos personales
              </Heading>
              {fields.slice(3,).map((fieldData) => createField({...fieldData }))}
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
