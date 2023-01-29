import { Flex, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';

export const Lander = () => {
  const navigate = useNavigate();

  return(
    <Flex justifyContent='center' flexDir='column'>
      <h1>Bienvenido a Donareasy!</h1><br />
      <h1>Tienes cuenta?</h1>
      <Button onClick={() => navigate(`${routes.login}`)}>Inicia sesión</Button><br />

      <h1>Si no tienes, puedes registrarte</h1>
      <Button onClick={() => navigate(`${routes.logup}`)}>Ir a registro</Button><br />
    </Flex>
  );
};
