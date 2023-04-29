import { FC } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  List,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { Bien, DonationModalProps, DonationStates, MoneyDonationStates} from "../types";
import { useAcceptDonation, useRejectDonation } from "../../../hooks";

const PendingHeader: FC = () => (
  <Heading size="lg">Aceptando donación ...</Heading>
);

export const DonationModal: FC<DonationModalProps> = ({
  item,
  isOpen,
  onClose: closeModal,
}) => {
  const {
    acceptDonation,
    accepted,
    pending: acceptPending,
    error: acceptError,
  } = useAcceptDonation();
  const { goToReject } = useRejectDonation();

  const onClose = () => {
    closeModal();
    if (accepted || acceptError) window.location.reload(); //Arreglar esto
  };

  const { bienes, id } = item;
  const accept = () => acceptDonation(item);

  const redirectToRejectView = () => {
    onClose();
    goToReject(item);
  };

  const Footer = () => (
    <Flex>
      {item.monto ? (
      <Flex justifyContent="center" width="100%" flexWrap="wrap">
        {item.cod_estado === MoneyDonationStates.Pendiente && !accepted && (
          <>
            <Box mb={2}>
              <Alert textAlign="center" width="100%" status="warning">
                Para poder enviar esta donación, debe ser aceptada.
                <br />
                {acceptError && "Intenta de nuevo más tarde."}
              </Alert>
            </Box>
            {!acceptError && (
              <Flex width="100%" justifyContent="center" mb={2}>
                <Button onClick={accept} colorScheme="teal" mr={2}>
                  Aceptar
                </Button>
                <Button onClick={redirectToRejectView} colorScheme="red" mr={2}>
                  Rechazar
                </Button>
              </Flex>
            )}
          </>
        )}
      </Flex>)
      : (<Flex justifyContent="center" width="100%" flexWrap="wrap">
      {item.cod_estado === DonationStates.Pendiente && !accepted && (
        <>
          <Box mb={2}>
            <Alert textAlign="center" width="100%" status="warning">
              Para poder enviar esta donación, debe ser aceptada.
              <br />
              {acceptError && "Intenta de nuevo más tarde."}
            </Alert>
          </Box>
          {!acceptError && (
            <Flex width="100%" justifyContent="center" mb={2}>
              <Button onClick={accept} colorScheme="teal" mr={2}>
                Aceptar
              </Button>
              <Button onClick={redirectToRejectView} colorScheme="red" mr={2}>
                Rechazar
              </Button>
            </Flex>
          )}
        </>
      )}
    </Flex>)}
    </Flex>
  );

  const Body = () => {
    if (acceptPending)
      return (
        <Flex height="250px" alignItems="center" justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      );

    if (accepted)
      return (
        <Flex height="250px" alignItems="center" justifyContent="center">
          <Heading size="lg">
            Donación aceptada. <br />
            Muchas gracias!
          </Heading>
        </Flex>
      );

    if (acceptError)
      return (
        <Flex height="250px" alignItems="center" justifyContent="center">
          <Heading size="lg">{(acceptError as any).message}</Heading>
        </Flex>
      );

    return (
      <>
        <Heading size="lg">
          {item.monto ? "Detalle de la transferencia" : "Detalle donaciones"}
        </Heading>
        <Divider mt={2} />
        <Flex
          mt={5}
          mb={5}
          maxHeight={"400px"}
          overflow={"auto"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "6px",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
          }}
        >
          {item.monto ? (
            <Stat>
              <StatLabel>Nro. transaccion:</StatLabel>
              <StatHelpText>{item.id}</StatHelpText>
              <StatLabel>Fecha</StatLabel>
              <StatHelpText>{item.fecha_transferencia}</StatHelpText>
              <StatLabel>Monto</StatLabel>
              <StatNumber>${item.monto}</StatNumber>
              <Divider mb={2} mt={2} />
              <StatLabel>Detalles de donante</StatLabel>
              <StatHelpText>
                Donante: {item.donante.nombre} {item.donante.apellido}
              </StatHelpText>
              <StatLabel>Telefono</StatLabel>
              <StatHelpText>{item.donante.telefono}</StatHelpText>
            </Stat>
          ) : (
            <List width={"100%"}>
              {bienes.map(({ descripcion, cantidad, nombre, id }: Bien) => {
                return (
                  <Stat key={id}>
                    <StatLabel>Nombre:</StatLabel>
                    <StatHelpText>{nombre}</StatHelpText>
                    <StatLabel>Detalle del bien:</StatLabel>
                    <StatHelpText>{descripcion}</StatHelpText>
                    <StatLabel>Cantidad</StatLabel>
                    <StatNumber>{cantidad}</StatNumber>
                    <Divider mb={2} mt={2} />
                  </Stat>
                );
              })}
            </List>
          )}
        </Flex>
      </>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{acceptPending ? <PendingHeader /> : null}</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <Body />
        </ModalBody>
        <ModalFooter mt={0}>{acceptPending ? null : <Footer />}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};
