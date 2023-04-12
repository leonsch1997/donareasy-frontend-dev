import { Flex } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import logo from "../../assets/LOGO_BLANCO.png";
import { routes } from "../../routes";


const image = (
  <img style={{ height: "48px", margin: 0 }} alt="donareasy-logo" src={logo} />
);

export const Logo = () => {
  const [{ clientSession }] = useCookies();
  return (
    <Flex
      height="100%"
      width="100%"
      maxW="300px"
      flexDir="row"
      flexWrap="nowrap"
      justifyContent="flex-start"
    >
      {clientSession ? <Link to={routes.home}>{image}</Link> : image}
    </Flex>
  );
};
