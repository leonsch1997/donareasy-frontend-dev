import { FC } from 'react';
import { Flex, Box, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

export const PageWrapper: FC = ({ children }) => {
  const navigate = useNavigate();
  const redirectToLogin = () => navigate('/login');

  return(
    <>
      <Flex height={'6vh'} p={2} bg={'teal.300'}>
        <Box p='2'>
          <Heading size='md'>
            <Link to={'/home'}>
              Donareasy
            </Link>
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Button onClick={redirectToLogin} colorScheme='pink' mr='4'>
            Iniciar sesión
          </Button>
        </Box>
      </Flex>
      <Flex height={'88vh'}>
        {children}
      </Flex>
      <Flex justifyContent={'flex-end'} height={'6vh'} bg={'teal.300'} />
    </>
  );
};
