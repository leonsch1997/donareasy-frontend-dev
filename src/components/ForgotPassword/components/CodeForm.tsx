import axios from 'axios';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Button, Input, Box, Container, Center, Link } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../../../api';
import { routes } from '../../../routes'
import { recoverPasswordSelector, setCurrentStep } from '../../../redux/reducers';

export interface ForgotPasswordCode { recoveryCode: string };

export const CodeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues: ForgotPasswordCode = { recoveryCode: '' };
  const handleSubmit = async (formValues: ForgotPasswordCode, actions: FormikHelpers<ForgotPasswordCode>) => {
    try {
      setTimeout(() => {
        console.log('Codigo enviado!')
        dispatch(setCurrentStep(3))
        // dispatch(setUserToken(authToken));
      }, 2000);
      // const authToken = await axios.post(endpoints['login'], formValues).then((res) => res.data.token);
    } catch {
      // dispatch(removeUserToken())
    }
  }

  return (
    <Container mt={50}>
      <Box borderRadius={5} shadow={'lg'} p={5}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Field name='recoveryCode'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.recoveryCode && form.touched.recoveryCode}>
                    <FormLabel htmlFor='recoveryCode'>Código de recuperación</FormLabel>
                    <Input {...field} id='recoveryCode' placeholder='Código de recuperación' />
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
                  Cambiar contraseña
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
      <Box borderRadius={5} shadow={'md'} p={5}>
        Ingresa el código de recuperación para crear tu nueva clave. <br/>
      </Box>
    </Container>
  )
};
