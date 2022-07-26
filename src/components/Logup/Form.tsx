import { useState } from 'react';
import { Button, Box, Container, Center, Heading } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import { createField } from './utils';
import { FieldData } from './types';
import {
  username,
  password,
  email,
  institution,
  name,
  lastname,
  fecha_nacimiento,
  dni,
  domicilio,
  localidad,
  provincia,
  pais,
  telefono,
  estado_civil,
  genero,
  ocupacion,
  l_name,
  l_lastname,
  l_fecha_nacimiento,
  l_dni,
  l_domicilio,
  l_localidad,
  l_provincia,
  l_pais,
  l_telefono,
  l_estado_civil,
  l_genero,
  l_ocupacion,
  l_username,
  l_password,
  l_email,
  l_institution,
  p_username,
  p_email,
  p_institution,
} from '../constants';
interface FormValues {
  username: string;
}

const fields: FieldData[] = [
  { name: username, label: l_username, placeholder: p_username },
  { name: password, label: l_password, dataType: 'password' },
  { name: email, label: l_email, placeholder: p_email, dataType: 'email' },
  // { name: institution, label: l_institution, placeholder: p_institution, dataType: 'checkbox' },
  { name: name, label: l_name },
  { name: lastname, label: l_lastname },
  { name: fecha_nacimiento, label: l_fecha_nacimiento },
  { name: dni, label: l_dni },
  { name: domicilio, label: l_domicilio },
  { name: pais, label: l_pais },
  { name: provincia, label: l_provincia },
  { name: localidad, label: l_localidad },
  { name: telefono, label: l_telefono },
  { name: estado_civil, label: l_estado_civil },
  { name: genero, label: l_genero },
  { name: ocupacion, label: l_ocupacion },
];

export const LogupForm = () => {
  const [registerFields, setRegisterFields] = useState(fields)
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleSubmit = async (formValues: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log('submitting');
  }

  const addUserTypeFields = () => {
    setRegisterFields([...fields,

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
    institution: false,
  }

  return (
    <Container mt={50}>
      <Center>
        <Heading as='h3' size='xl'>
          Registrarse
        </Heading>
      </Center>

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
