import { Flex, Text } from '@chakra-ui/react';
import { CSSProperties } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import logo from '../../assets/LOGO_BLANCO.png';
import { routes } from '../../routes';

const contentStyles = { width: '100%', display: 'flex', alignItems: 'center', marginLeft: '5px' } as CSSProperties;
const spacerStyles = {
  minHeight: "40px",
  background: "white",
  width: "1px",
  margin: "0 15px 0 15px",
  color: "white",
  fontWeight: "bold",
  borderRadius: "10px",
  height: "100%",
} as CSSProperties;

const content = (
  <div style={contentStyles}>
    <img style={{ height: "40px", margin: 0 }} alt="donareasy-logo" src={logo} />
    <div style={spacerStyles} />
    <Text letterSpacing="1px" as="b" fontSize="xl" color="white">
      Donareasy
    </Text>
  </div>
)

export const Logo = () => {
  const [{ userToken }] = useCookies();
  return (
    <Flex height='100%' width='100%' maxW='300px' flexDir='row' flexWrap='nowrap' justifyContent='flex-start'>
      {userToken ? <Link to={routes.home}>{content}</Link> : content}
    </Flex>
  )
};
