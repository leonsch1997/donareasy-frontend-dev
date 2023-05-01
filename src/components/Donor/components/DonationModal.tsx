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
import { Bien, DonationModalProps, DonationStates, MoneyDonationStates } from "../types";
//import { useAcceptDonation, useRejectDonation } from "../../../hooks";
import { useCancelDonation } from "../../../hooks";

const PendingHeader: FC = () => (
  <Heading size="lg">
    Detalle de Donación
  </Heading>
);

export const DonationModal: FC<DonationModalProps> = ({
  item,
  isOpen,
  onClose: closeModal,
}) => {
  // //Llamada al hook
  // const {
  //   acceptDonation,
  //   accepted,
  //   pending: acceptPending,
  //   error: cancelError,
  // } = useAcceptDonation();

  // //Llamada al Hook
  // const { goToReject } = useRejectDonation();

  const onClose = () => {
    closeModal();
    if (cancelled || cancelError) window.location.reload(); //Arreglar esto
  };

  const { bienes, id } = item;

  // //Llamada desde botón
  // const accept = () => acceptDonation(id);

  // //Llamada desde botón
  // const redirectToRejectView = () => {
  //   onClose();
  //   goToReject(item);
  // };

  const { 
    cancelDonation,
    cancelled,
    pending: acceptPending,
    error: cancelError,
   } = useCancelDonation();

  const cancel = () => cancelDonation(id);

  const Footer = () => (
    <Flex justifyContent="center" width="100%" flexWrap="wrap">
      {((item.cod_estado === DonationStates.Pendiente && !item.monto)
      || (item.cod_estado === MoneyDonationStates.Pendiente && item.monto))
      && !cancelled && (
        <>
          <Box mb={2}>
            <Alert textAlign="center" width="100%" status="warning">
              Para poder enviar esta donación, debe ser aceptada.
              <br />
              {cancelError && "Intenta de nuevo más tarde."}
            </Alert>
          </Box>
          {!cancelError && (
            <Flex width="100%" justifyContent="center" mb={2}>
              <Button onClick={cancel} colorScheme="red" mr={2}>
                Cancelar
              </Button>
            </Flex>
          )}
        </>
      )}
    </Flex>
  );

  const Body = () => {
    if (acceptPending)
      return (
        <Flex height="250px" alignItems="center" justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      );

    if (cancelled)
      return (
        <Flex height="250px" alignItems="center" justifyContent="center">
          <Heading size="lg">
            Donación aceptada. <br />
            Muchas gracias!
          </Heading>
        </Flex>
      );

    if (cancelError)
      return (
        <Flex height="250px" alignItems="center" justifyContent="center">
          <Heading size="lg">{(cancelError as any).message}</Heading>
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
