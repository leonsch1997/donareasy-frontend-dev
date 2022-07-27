import axios from 'axios';
import { useState } from 'react';
import { Button, Box, Container, Center, Heading } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';

import { endpoints } from '../../api';
import { formFields } from '../constants';
import { DonorFormValues } from './types';
import { createField, validateUserFields } from './utils';

export const LogupForm = () => {
  const [logupFields, setLogupFields] = useState(formFields['user']);
  const [showUserTypeFields, setShowUserTypeFields] = useState(false);
  // const ref = useRef(null); // Scroll to type user fields when added

  const userType = 'donor' // Pull from somewhere else
  const initialValues: DonorFormValues = {
    username: '',
    password: '',
    email: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    dni: '',
    domicilio: '',
    pais: '',
    provincia: '',
    localidad: '',
    telefono: '',
    estado_civil: '',
    genero: '',
    ocupacion: '',
  }

  // Reemplazar DonorFormValues por LogupFormValues
  const handleSubmit = async (formValues: DonorFormValues, actions: FormikHelpers<DonorFormValues>) => {
    try {
      console.log('formvalues', formValues);
      const res = await axios.post(endpoints['logup'], formValues).then((res) => res.data);
      console.log(res);
    } catch {
      console.log('Errrrrrrr')
    }
      // await axios.post('http://localhost:8000/login/logup', formValues).then((res) => {
  //     console.log('Response', res)
  //   }).catch((err) => {
  //     console.log('Error', err)
  //   })
  // }
    console.log('submitting', formValues);
  }

  const addUserTypeFields = (e: any) => {
    e.preventDefault(); // Avoid submitting
  
    if (validateUserFields()) {
      setShowUserTypeFields(true);
      setLogupFields([...logupFields, ...formFields[userType] || []]);
    }
  }

  return (
    <Container mt={50}>
      <Center>
        <Heading as='h3' size='xl'>
          Registrarse
        </Heading>
      </Center>

      <Box borderRadius={5} shadow={'lg'} p={5}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Heading as='h4' size='md' textAlign='center' mb={3}>
                Datos del usuario
              </Heading>
              {logupFields.slice(0,3).map((fieldData) => createField({...fieldData }))}
              {logupFields.length > 3 && (
                <>
                  <Heading as='h4' size='md' textAlign='center' mb={3}>
                    Datos personales
                  </Heading>
                  {logupFields.slice(3,).map((fieldData) => createField({...fieldData }))}
                </>
              )}
              <Center>
                {!showUserTypeFields ? (
                  <Button
                    mt={4}
                    colorScheme='pink'
                    onClick={addUserTypeFields}
                  >
                    Completar datos personales
                  </Button>
                ) : (
                  <Button
                    mt={4}
                    colorScheme='pink'
                    type='submit'
                    isLoading={isSubmitting}
                  >
                    Registrarse
                  </Button>
                )}
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  )
};
