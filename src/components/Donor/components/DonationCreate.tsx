import { Button, Flex, Heading, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";

export const RejectDonation = () => {
  const navigate = useNavigate();

  const RedirectButton = () => (
    <Flex mt={10}>
      <Button colorScheme="pink" onClick={() => navigate(routes.home)}>
        Ir al dashboard
      </Button>
    </Flex>
  );

  const RejectedBody = () => (
    <>
      <Heading textAlign="center">
        Gracias por darnos el detalle. Hemos rechazado ésta donación.
      </Heading>
      <RedirectButton />
    </>
  );

  return (
    <Container centerContent={true} pt={10} boxShadow="lg" mt={5} p={5}>
      <RejectedBody />
    </Container>
  );
};
