import { FC } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { Bien, DonationModalProps, DonationStates } from "../types";
import { useAcceptDonation } from "../../../hooks";
import { useHref, useNavigate } from "react-router-dom";

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
  // const {
  //   rejectDonation,
  //   rejected,
  //   pending: rejectPending,
  //   error: rejectError,
  // } = useRejectDonation();

  const onClose = () => {
    closeModal();
    if (accepted || acceptError) window.location.reload(); //Arreglar esto
  }

  const { bienes, id } = item;
  const accept = () => acceptDonation(id);
  // const reject = () => rejectDonation(id);

  // console.log({ rejected, rejectPending, rejectError });
  const redirectToRejectView = () => {
    onClose();
    console.log('Open reject prompt')
  };

  const Footer = () => (
    <Flex justifyContent="center" width="100%" flexWrap="wrap">
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
        <Heading size="lg">Detalle donaciones</Heading>
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
          <List>
            {bienes.map(({ descripcion, cantidad, nombre, id }: Bien) => {
              return (
                <ListItem textAlign={"start"} key={id} mb={4}>
                  <span>
                    <b>Nombre: </b>
                    {nombre}
                  </span>
                  <br />
                  <span>
                    <b>Detalle: </b>
                    {descripcion}
                  </span>
                  <br />
                  <span>
                    <b>Cantidad: </b>
                    {cantidad}
                  </span>
                  <Divider />
                </ListItem>
              );
            })}
          </List>
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
