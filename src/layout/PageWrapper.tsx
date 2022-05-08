import { FC } from 'react';
import { Flex, Box, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeUserToken } from '../redux/reducers';

export const PageWrapper: FC = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = useSelector(authSelector);
  const handleSessionButton = () => {
    if (authToken) {
      dispatch(removeUserToken())
    }

    navigate(routes.login);
  }

  return(
    <>
      <Flex height={'55px'} p={2} bg={'teal.300'}>
        <Box p='2'>
          <Heading size='md'>
            <Link to={'/home'}>
              Donareasy
            </Link>
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Button onClick={handleSessionButton} colorScheme='pink' mr='4'>
            {authToken ? 'Cerrar sesión' : 'Iniciar sesión'}
          </Button>
        </Box>
      </Flex>
      <Flex height={'88vh'}>
        {children}
      </Flex>
      <Flex justifyContent={'flex-end'} height={'40px'} bg={'teal.300'} />
    </>
  );
};
