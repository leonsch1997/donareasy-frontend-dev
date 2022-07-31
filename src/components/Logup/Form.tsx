import axios from 'axios';
import { useState } from 'react';
import { Button, Box, Container, Center, Heading } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';

import { endpoints } from '../../api';
import { formFields } from '../constants';
import { DonorFormValues } from './types';
import { createField, formatLogupFormData, validateUserFields } from './utils';

export const LogupForm = () => {
  const [logupFields, setLogupFields] = useState(formFields['user']);
  const [showUserTypeFields, setShowUserTypeFields] = useState(false);
  // const ref = useRef(null); // Scroll to type user fields when added
  const userType = 'donante' // Pull from somewhere else

  const initialValues = {
    usuario: '',
    username: '',
    password: '',
    email: '',
    correo: '',
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
  // const handleSubmit = async ({ usuario, nombre, apellido, correo, email, username, ...rest }: DonorFormValues, actions: FormikHelpers<DonorFormValues>) => {
  const handleSubmit = async (formValues: DonorFormValues, actions: FormikHelpers<DonorFormValues>) => {
    try {
      const formattedData = formatLogupFormData(userType, formValues);
      // const res = await axios.post(`${endpoints['logup']}${userType}/`, formatLogupFormData(userType, formValues)).then((res) => res.data);
      console.log(formattedData);
    } catch {
      console.log('Errrrrrrr')
    }
  }

  const addUserTypeFields = (e: any) => {
    e.preventDefault(); // Avoid submitting
  
    if (validateUserFields()) {
      setShowUserTypeFields(true);
      setLogupFields([...logupFields, ...formFields[userType] || []]);
    }
  }

  const checkUsers = async () => {
    try {
      await axios.get(`${endpoints['donantes']}`).then((res) => console.log(res.data.results));
    } catch {
      console.log('Error get donantes');
    }
  }

  return (
    <Container mt={50}>
      <Center>
        <Heading as='h3' size='xl'>
          Registrarse
        </Heading>
        <Button onClick={checkUsers}>
          Lookup
        </Button>
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
