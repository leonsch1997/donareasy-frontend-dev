import axios from 'axios';
import { useState } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Button, Input, Box, Container, Center, Link, Alert, AlertIcon, Heading } from '@chakra-ui/react';

import { wrongCredentialsError } from '../constants';
import { endpoints } from '../../api';
import { routes } from '../../routes'
import { LoginFormValues } from './types';
import { setUserToken, removeUserToken } from '../../redux/reducers';

const initialValues: LoginFormValues = {
  username: '',
  password: '',
}

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reqError, setReqError] = useState('');

  const handleSubmit = async (formValues: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    try {
      setSubmitting(true);
      const authToken = await axios.post(endpoints['login'], formValues).then((res) => res.data.token);
      
      setSubmitting(false)
      dispatch(setUserToken(authToken));
      navigate(routes.home);
    } catch {
      setSubmitting(false);
      setReqError(wrongCredentialsError);
      dispatch(removeUserToken())
    }
  }

  // await axios.post('http://localhost:8000/login/logup', formValues).then((res) => {
  //     console.log('Response', res)
  //   }).catch((err) => {
  //     console.log('Error', err)
  //   })
  // }

  return (
    <Container mt={50}>
      <Center>
        <Heading as='h3' size='xl'>
          Iniciar sesión
        </Heading>
      </Center>

      <Box borderRadius={5} shadow={'lg'} p={5}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Field name='username'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.username && form.touched.username}>
                    <FormLabel htmlFor='username'>Usuario</FormLabel>
                    <Input {...field} id='username' placeholder='Usuario' />
                    <FormErrorMessage mb={3}>{form.errors?.[field.name] ?? ''}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='password'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor='password'>Contraseña</FormLabel>
                    <Input type={'password'} {...field} id='password' placeholder='password' mb={reqError ? 3 : 0} />
                    <FormErrorMessage mb={3}>{form.errors?.[field.name] ?? ''}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {reqError && (
                <Alert status='error'><AlertIcon />{reqError}</Alert>
              )}

              <Center>
                <Button
                  mt={4}
                  colorScheme='pink'
                  isLoading={isSubmitting}
                  type='submit'
                >
                  Login
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
      <Box borderRadius={5} shadow={'md'} p={5}>
        Ingrese sus credenciales para acceder al sistema. <br/>
        Si no tienes cuenta puedes <Link color={'blue'} href="/logup">crear una aquí<ExternalLinkIcon mb={1} ml={1} /></Link><br />
        Puede recuperar sus credenciales en caso de olvido <Link color={'blue'} href="/forgot-password">aquí<ExternalLinkIcon mb={1} ml={1} /></Link>
      </Box>
    </Container>
  )
}