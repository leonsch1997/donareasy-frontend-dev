import { Flex, Heading, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export const DonateSucceed = () => {
  const navigate = useNavigate();

  return (
    <Flex
      gap={6}
      align="center"
      textAlign="center"
      flexDir="column"
      justifyContent="center"
      w="75%"
    >
      <Heading textAlign="center" m={10}>
        Solicitud de donación enviada! Muchas gracias.
      </Heading>
      <Text fontSize="2xl">Te mantendremos informados de su estado estado</Text>
      <Button
        width={120}
        colorScheme="linkedin"
        onClick={() => navigate(routes.home)}
      >
        Entendido
      </Button>
    </Flex>
  );
};

export const DonateError = () => {
  const navigate = useNavigate();
  return (
    <Flex
      gap={6}
      align="center"
      textAlign="center"
      flexDir="column"
      justifyContent="center"
      w="75%"
    >
      <Heading textAlign="center" m={10}>
        No se ha podido procesar tu solicitud.
      </Heading>
      <Text fontSize="2xl">Inténtalo de nuevo más tarde</Text>
      <Button
        width={120}
        colorScheme="linkedin"
        onClick={() => navigate(routes.home)}
      >
        Ir a inicio
      </Button>
    </Flex>
  );
};
