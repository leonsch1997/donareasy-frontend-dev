import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Flex, Box, Heading, Spacer, Button } from '@chakra-ui/react';

import { routes } from '../routes';
import { authSelector, removeUserToken } from '../redux/reducers';

export const PageWrapper: FC = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = useSelector(authSelector);
  const location = useLocation();

  const handleSessionButton = () => {
    if (authToken) dispatch(removeUserToken())
    navigate(routes.login);
  }

  return(
    <>
      <Flex height={'55px'} p={2} bg={'teal.300'}>
        <Box p='2'>
          <Heading size='md'>
            <Link to={routes.home}>
              Donareasy
            </Link>
          </Heading>
        </Box>
        <Spacer />
        <Box>
          {location.pathname !== routes.login && (
            <Button onClick={handleSessionButton} colorScheme='pink' mr='4'>
              {authToken ? 'Cerrar sesión' : 'Iniciar sesión'}
            </Button>
          )
        }
        </Box>
      </Flex>
      <Flex minHeight={'70vh'} height={'auto'}>
        {children}
      </Flex>
    </>
  );
};
