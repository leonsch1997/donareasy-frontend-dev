//import axios from 'axios';
import { Formik, Field, Form  } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Button, Input, Box, Container } from '@chakra-ui/react';

//import { useDispatch, useSelector } from 'react-redux';
//import { setUserToken, removeUserToken } from '../../redux/reducers';

const initialValues = {
  email: null,
  password: null,
}

//const makeRequest = async () => {
//  await axios.get('http://localhost:8000/login/donantes/').then((res) => {
//    console.log('Success', res)
//  }).catch((err) => {
//    console.log('Error', err)
//  })
//}

export const LoginForm = () => {
  //const dispatch = useDispatch();
  //const authToken = useSelector((store: any) => store.userAuth.authToken);
  //<button onClick={() => dispatch(setUserToken('1235raxcfqerf319vb'))}>Loggear usuario</button>
  //<button onClick={() => dispatch(removeUserToken())}>Desloggear usuario</button>
  return (
    <Container mt={50}>
      <Box>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              actions.setSubmitting(false)
            }, 1000)
          }}
        >
          {(props) => (
            <Form>
              <Field name='email'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input {...field} id='email' placeholder='email' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='password'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input {...field} id='password' placeholder='password' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                mt={4}
                colorScheme='teal'
                isLoading={props.isSubmitting}
                type='submit'
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  )
}