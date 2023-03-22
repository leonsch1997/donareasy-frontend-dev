import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex, Box, Spacer, Button } from "@chakra-ui/react";

import { routes } from "../routes";
import { useCookies } from "react-cookie";
import { csrftoken } from "../components/constants";
import { Logo } from './components';

export const PageWrapper: FC = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies,,removeCookie] = useCookies();

  const handleSessionButton = () => {
    if (cookies['csrftoken']) removeCookie(csrftoken);
    navigate(routes.login);
  };

  console.log(cookies)
  return (
    <>
      <Flex p={2} bg={"teal.300"}>
        <Logo />
        <Spacer />
        <Box>
          {location.pathname !== routes.login && (
            <Button onClick={handleSessionButton} colorScheme="pink" mr="4">
              {cookies['csrftoken'] ? "Cerrar sesión" : "Iniciar sesión"}
            </Button>
          )}
        </Box>
      </Flex>

      <Flex justifyContent={"center"} minHeight={"70vh"} height={"auto"}>
        {children}
      </Flex>
    </>
  );
};
