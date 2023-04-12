import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex, Box, Spacer, Button } from "@chakra-ui/react";

import { routes } from "../routes";
import { useCookies } from "react-cookie";
import { clientSession } from "../components/constants";
import { Logo } from "./components";

export const PageWrapper: FC = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies();

  const handleSessionButton = () => {
    if (cookies[clientSession]) removeCookie(clientSession);
    navigate(routes.login);
  };

  return (
    <>
      <Flex p={3} bg={"teal.300"}>
        <Logo />
        <Spacer />
        <Box>
          {location.pathname !== routes.login && (
            <Button onClick={handleSessionButton} colorScheme="pink" size="lg">
              {cookies[clientSession] ? "Cerrar sesión" : "Iniciar sesión"}
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
