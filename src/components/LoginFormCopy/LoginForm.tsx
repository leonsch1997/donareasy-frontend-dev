import { useState, useRef } from 'react';
import axios from 'axios';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Button, Input, Box, Container, Center, Link, Alert, AlertIcon } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../../api';
import { routes } from '../../routes'
import { setUserToken, removeUserToken } from '../../redux/reducers';
import { LoginFormValues } from './types';

const initialValues: LoginFormValues = {
  username: '',
  password: '',
}

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reqError, setReqError] = useState('');

  const handleSubmit = async (formValues: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
    try {
      actions.setSubmitting(true);
      const authToken = await axios.post(endpoints['login'], formValues).then((res) => res.data.token);
      
      actions.setSubmitting(false)
      dispatch(setUserToken(authToken));
      navigate(routes.home);
    } catch {
      actions.setSubmitting(false);
      setReqError('Usuario o contraseña incorrectos, por favor revise las credenciales');
      dispatch(removeUserToken())
    }
  }

  // FALTA DEBUG
  // await axios.post('http://localhost:8000/login/logout/', { token: 'ab2b10de395d707b13b2e550f3256edd7c4e9920' }).then((res) => {
  //   console.log('Response', res)
  // }).catch((err) => {
  //   console.log('Error', err)
  // })

  // await axios.post('http://localhost:8000/login/logup', formValues).then((res) => {
  //     console.log('Response', res)
  //   }).catch((err) => {
  //     console.log('Error', err)
  //   })
  // }

  return (
    <Container mt={50}>
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
        Puede recuperar sus credenciales en caso de olvido <Link color={'blue'} href="/forgot-password">aquí<ExternalLinkIcon mb={1} ml={1} /></Link>
      </Box>
    </Container>
  )
}