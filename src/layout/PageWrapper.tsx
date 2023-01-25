import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex, Box, Text, Spacer, Button } from "@chakra-ui/react";
import logo from "../assets/LOGO_BLANCO.png";

import { routes } from "../routes";
import { useCookies } from "react-cookie";
import { tokenCookieKey } from "../components/constants";

export const PageWrapper: FC = ({ children }) => {
  const location = useLocation();
  const [{ userToken },,removeCookie] = useCookies();

  const handleSessionButton = async () => {
    if (userToken) removeCookie(tokenCookieKey)
      // await axios.post(endpoints.logout, {}, { withCredentials: true });
  };

  const VerticalSpacer = () => {
    return (
      <div
        style={{
          minHeight: "40px",
          background: "white",
          width: "1px",
          margin: "0 15px 0 0",
          color: "white",
          fontWeight: "bold",
          borderRadius: "10px",
          height: "100%",
        }}
      />
    );
  };

  return (
    <>
      <Flex p={2} bg={"teal.300"}>
        <Box as="button" maxWidth="75px" width="100%">
          <Link to={routes.home}>
            <img style={{ height: "40px", margin: 0 }} alt="logo" src={logo} />
          </Link>
        </Box>
        <VerticalSpacer />
        <Flex alignItems="center">
          <Link to={routes.home}>
            <Text letterSpacing="1px" as="b" fontSize="xl" color="white">
              Donareasy
            </Text>
          </Link>
        </Flex>

        <Spacer />
        <Box>
          {location.pathname !== routes.login && (
            <Button onClick={handleSessionButton} colorScheme="pink" mr="4">
              {userToken ? "Cerrar sesión" : "Iniciar sesión"}
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
