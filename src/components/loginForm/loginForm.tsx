//import axios from 'axios';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Button, Input, Box, Container, Center, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//import { useDispatch, useSelector } from 'react-redux';
//import { setUserToken, removeUserToken } from '../../redux/reducers';

interface LoginFormValues {
  username: string | null;
  password: string | null;
}

const initialValues: LoginFormValues = {
  username: null,
  password: null,
}

//const authToken = useSelector((store: any) => store.userAuth.authToken);
//<button onClick={() => dispatch(setUserToken('1235raxcfqerf319vb'))}>Loggear usuario</button>
//<button onClick={() => dispatch(removeUserToken())}>Desloggear usuario</button>

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (formValues: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
//  await axios.get('http://localhost:8000/login/donantes/').then((res) => {
//    dispatch(setUserToken(...));
//  }).catch((err) => {
//    console.log('Error', err)
//  })
    console.log(formValues, actions, dispatch);
    setTimeout(() => { actions.setSubmitting(false); navigate('/home') }, 1000)
  }

  return (
    <Container mt={50}>
      <Box borderRadius={5} shadow={'lg'} p={5}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Field name='email'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor='email'>Correo</FormLabel>
                    <Input type={'email'} {...field} id='email' placeholder='Correo' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='password'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor='password'>Contraseña</FormLabel>
                    <Input type={'password'} {...field} id='password' placeholder='password' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

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