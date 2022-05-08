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
  { name: 'username', label: 'Usuario', placeholder: 'Usuario' },
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

  const addUserTypeFields = () => {
    setRegisterFeidls([...fields,

    // if (userType == ...)
    
    // "nombre": "",
    // "director": "",
    // "fecha_fundacion": null, (fecha)
    // "domicilio": "",
    // "localidad": "",
    // "provincia": "",
    // "pais": "",
    // "telefono": "",
    // "cant_empleados": null, (numero)
    // "descripcion": "",
    // "cbu": null, (numero)
    // "cuenta_bancaria": ""
      { name: 'instName', label: 'Nombre de Institucion' },
      { name: 'director', label: 'Director' },
      { name: 'foundDate', label: 'Fecha de fundación', dataType: 'date' },
      { name: 'address', label: 'Dirección' },
      { name: 'state', label: 'Localidad' },
      { name: 'province', label: 'Provincia' },
      { name: 'country', label: 'País' },
      { name: 'phone', label: 'Teléfono', dataType: 'tel' },
      { name: 'empAmount', label: 'Cantidad de empleados' },
      { name: 'cbu', label: 'CBU' },
      { name: 'bankAccount', label: 'Cuenta bancaria' },
    ])
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
        Registrarse
      </Heading>

        <Box borderRadius={5} shadow={'lg'} p={5}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              {registerFields.map((fieldData) => createField({...fieldData, isRequired: true }))}
              <Center>
                <Button
                  mt={4}
                  colorScheme='pink'
                  isLoading={isSubmitting}
                  type='submit'
                  onClick={addUserTypeFields}
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
