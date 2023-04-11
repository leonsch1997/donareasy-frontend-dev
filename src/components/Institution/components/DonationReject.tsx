import { Button, Flex, Heading, Container } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Donation } from "../types";
import { useRejectDonation } from "../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEventHandler, useState } from "react";
import { routes } from "../../../routes";

export const RejectDonation = () => {
  const { state } = useLocation(); // Recibe donacion via navigate
  const navigate = useNavigate();
  const { rejectDonation, rejected, pending } = useRejectDonation();
  const [motivo, setMotivo] = useState("");

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setMotivo(e.target.value);

  const handleReject = () => rejectDonation((state as Donation).id);

  console.log(state);
  if (!state) return null;

  const RedirectButton = () => (
    <Flex mt={10}>
      <Button colorScheme="pink" onClick={() => navigate(routes.home)}>Ir al dashboard</Button>
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

  const ErrorBody = () => (
    <>
      <Heading  textAlign="center">
        Ha ocurrido un error al cargar la página. Intenta nuevamente
        seleccionando la donación a rechazar desde la lista
      </Heading>
      <RedirectButton />
    </>
  );

  return (
    <Container centerContent={true} pt={10}>
      {!state && <ErrorBody />}
      {rejected && <RejectedBody />}
      {!rejected && state && (
        <>
          <Heading>Cuéntanos por que ésta donación no puede realizarse</Heading>
          <Textarea
            marginTop={10}
            value={motivo}
            onChange={handleChange}
            placeholder="Los bienes se encuentran en un estado demasiado deteriorado."
            size="lg"
          />
          <Button
            mt={4}
            colorScheme="pink"
            isLoading={pending}
            onClick={handleReject}
          >
            Enviar
          </Button>
        </>
      )}
    </Container>
  );
};
