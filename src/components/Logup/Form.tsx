import { useState } from 'react';
import { Button, Box, Container, Center, Heading } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import { FieldData, createField } from './utils';

interface FormValues {
  username: string;
}

const fields: FieldData[] = [
  { name: 'username', label: 'Usuario', placeholder: 'Usuario'},
  { name: 'password', label: 'Contraseña', placeholder: 'Contraseña', dataType: 'password' },
  { name: 'email', label: 'Correo', placeholder: 'correo', dataType: 'email' },
  { name: 'isIisIns', label: 'Es institución?', dataType: 'checkbox' }
];

export const LogupForm = () => {
  const [registerFields, setRegisterFeidls] = useState(fields)
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleSubmit = async (formValues: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log('submitting');
  }

  const initialValues: any = {
    username: '',
    password: '',
    email: '',
    isIns: false,
  }

  return (
    <Container mt={50}>
      <Heading as='h3' size='xl'>
        Registrar usuario
      </Heading>

        <Box borderRadius={5} shadow={'lg'} p={5}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              {registerFields.map((fieldData) => createField({...fieldData}))}
              <Center>
                <Button
                  mt={4}
                  colorScheme='pink'
                  isLoading={isSubmitting}
                  type='submit'
                  onClick={() => setRegisterFeidls([...fields, { name: 'newField', label: 'some' }])}
                >
                  Continuar
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  )
};
