import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Flex, Box, Text, Spacer, Button } from '@chakra-ui/react';
import logo from '../assets/LOGO_BLANCO.png';

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

  const VerticalSpacer = () => {
    return (
      <div style={{ minHeight: '40px', background: 'white', width: '1px', margin: '0 15px 0 0', color: 'white', fontWeight: 'bold', borderRadius: '10px', height: '100%' }} />
    )
  };
  
  return(
    <>
      <Flex p={2} bg={'teal.300'}>
        <Box as="button" maxWidth="75px" width="100%">
          <Link to={routes.home}>
            <img style={{ height: "40px", margin:0 }} alt="logo" src={logo} />
          </Link>
        </Box>
        <VerticalSpacer />
        <Flex alignItems='center'>
          <Link to={routes.home}>
            <Text letterSpacing="1px" as="b" fontSize='xl' color="white">Donareasy</Text>
          </Link>
        </Flex>

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
