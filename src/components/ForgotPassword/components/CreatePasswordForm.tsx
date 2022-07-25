import axios from 'axios';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Button, Input, Box, Container, Center, Link } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../../../api';
import { routes } from '../../../routes'
import { recoverPasswordSelector, setCurrentStep } from '../../../redux/reducers';

export interface ForgotPasswordForm { password: string; repeatPassowrd: string; };

export const CreatePasswordForm = () => {
  const initialValues: ForgotPasswordForm = { password: '', repeatPassowrd: '' };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formValues: ForgotPasswordForm, actions: FormikHelpers<ForgotPasswordForm>) => {
    try {
      setTimeout(() => {
        console.log('Creando clave...')
        dispatch(setCurrentStep(0))
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
              <Field name='password'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor='password'>Nueva clave</FormLabel>
                    <Input {...field} id='password' placeholder='Nueva clave' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='repeatPassowrd'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.repeatPassowrd && form.touched.repeatPassowrd}>
                    <FormLabel htmlFor='repeatPassowrd'>Repita nueva clave</FormLabel>
                    <Input type={'repeatPassowrd'} {...field} id='repeatPassowrd' placeholder='Repita nueva clave' />
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
                  Confirmar
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  )
};
