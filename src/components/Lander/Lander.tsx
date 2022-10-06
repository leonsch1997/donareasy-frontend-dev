import { Center, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authSelector } from '../../redux/reducers';
import { routes } from '../../routes';

export const Lander = () => {
  const { username, authToken } = useSelector(authSelector);
  console.log({ username, authToken })
  const navigate = useNavigate();

  return(
    <Center width={'100vw'}>
      <Button onClick={() => navigate(`${routes.donaciones}`)}>Ir a donaciones</Button>
    </Center>
  );
};
