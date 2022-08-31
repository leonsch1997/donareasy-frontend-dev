import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { Button, Box, Container, Center, Heading, Select, HStack, FormLabel } from '@chakra-ui/react';
import { endpoints } from '../../api';
import { userTypeOptions } from '../constants';
import { UserType } from './types';
import { CadeteForm, DonanteForm, InstitucionForm } from './Forms';

export const LogupForm = () => {
  const [userType, setUserType] = useState<UserType>('donante');
  const checkUsers = async () => {
    try {
      await axios.get(`${endpoints['donantes']}`).then((res) => console.log(res.data.results));
    } catch {
      console.log('Error get donantes');
    }
  }

  const selectUserType = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) setUserType(event.target.value as UserType);
  };

  const UserTypeForm = () => {
    const allForms = {
      'cadete': <CadeteForm />,
      'institucion': <InstitucionForm />,
      'donante': <DonanteForm />,
      'user': null,
    }

    return allForms[userType];
  }

  return (
    <Container mt={50}>
      <Center>
        <Heading as='h3' size='xl'>
          Registrarse
        </Heading>
        {/* <Button onClick={checkUsers}>
          Lookup
        </Button> */}
      </Center>

      <Box borderRadius={5} shadow={'lg'} p={5}>
        <Heading as='h4' size='md' textAlign='center' mb={5}>
          Datos del usuario
        </Heading>
        <HStack mb={'8'}>
          <FormLabel>Tipo</FormLabel>
          <Select onChange={selectUserType}>
            {userTypeOptions.map((option, idx) => (
              <option key={`${option}-${idx}`} value={option}>{option}</option>
            ))}
          </Select>
        </HStack>
        <UserTypeForm />
      </Box>
    </Container>
  )
};
