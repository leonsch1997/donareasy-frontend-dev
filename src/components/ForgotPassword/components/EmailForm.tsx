import axios from 'axios';
import { Formik, Field, Form, FormikHelpers, useFormik, useFormikContext } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Button, Input, Box, Container, Center, Link } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../../../api';
import { routes } from '../../../routes'
import { recoverPasswordSelector, setCurrentStep, setUserToken } from '../../../redux/reducers';

export interface ForgotPasswordEmail { email: string };

export const EmailForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues: ForgotPasswordEmail = {
    email: '',
  }

  const handleSubmit = async (formValues: ForgotPasswordEmail, { setSubmitting }: FormikHelpers<ForgotPasswordEmail>) => {
    try {
      setTimeout(() => {
        console.log('Correo enviado!', formValues)
        dispatch(setCurrentStep(2))
      }, 2000)
    } catch {
      console.log('No hemos podido validar el correo')
    }
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
                      <FormLabel htmlFor='email'>Ingrese correo electrónico</FormLabel>
                      <Input type={'email'} {...field} id='email' placeholder='correo@example.com' />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
  
                <Center>
                  <Button
                    mt={4}
                    colorScheme='pink'
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                    type='submit'
                  >
                    Enviar
                  </Button>
                </Center>
              </Form>
            )}
        </Formik>
      </Box>
      <Box borderRadius={5} shadow={'md'} p={5}>
        Te enviaremos un código de recuperación a tu correo, revisa tu bandeja luego de que lo envíes. <br/>
      </Box>
    </Container>
  )
};
