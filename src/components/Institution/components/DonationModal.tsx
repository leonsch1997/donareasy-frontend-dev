import { FC, useState } from "react";
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
import { Bien, DonationModalProps } from "../types";

const PendingHeader: FC = () => <Heading size="lg">Aceptando donación ...</Heading>;
const PendingBody: FC = () => (
  <Flex height="250px" alignItems="center" justifyContent="center">
    <Spinner size="xl" />
  </Flex>
);

export const DonationModal: FC<DonationModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [acceptPending, setAcceptPending] = useState(false);
  const { bienes } = item;
  const acceptDonation = () => {
    console.log("Awaiting ...");
    setAcceptPending(true);
    setTimeout(() => {
      setAcceptPending(false);
      console.log("Accepted!");
    }, 2000);
  };

  const rejectDonation = () => {
    console.log("Awaiting ...");
    setAcceptPending(true);
    setTimeout(() => {
      setAcceptPending(false);
      console.log("Rejected!");
    }, 2000);
  };

  const Footer = () => (
    <Flex justifyContent="center" width="100%" flexWrap="wrap">
      {true && ( // !fecha_aceptacion
        <>
          <Box mb={2}>
            <Alert width="100%" status="warning">
              Para poder enviar esta donación, debe ser aceptada
            </Alert>
          </Box>
          <Flex width="100%" justifyContent="center" mb={2}>
            <Button onClick={acceptDonation} colorScheme="teal" mr={2}>
              Aceptar
            </Button>
            <Button onClick={rejectDonation} colorScheme="red" mr={2}>
              Rechazar
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );

  const Body = () => {
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
          {acceptPending ? <PendingBody /> : <Body />}
        </ModalBody>

        <ModalFooter mt={0}>{acceptPending ? null : <Footer />}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};
