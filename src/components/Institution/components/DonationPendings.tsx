import {
  Flex,
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  Alert,
  ModalFooter,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { CheckIcon, TimeIcon } from "@chakra-ui/icons";
import { Donation, Bien, DonationStates } from "../types";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { endpoints } from "../../../api";
import { usePendingDonations } from "../../../hooks";
import { LoadingSpinner } from "../../Common";

const DonationModal = ({
  item,
  isOpen,
  onClose,
}: {
  item: Bien;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { nombre, fecha_aceptacion, descripcion, cantidad } = item;
  const [acceptPending, setAcceptPending] = useState(false);

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
      {!fecha_aceptacion && (
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

  const Body = () => (
    <>
      <Heading size="lg">{nombre}</Heading>
      <Divider mt={2} />
      <Flex mt={5} mb={5}>
        {descripcion}
      </Flex>
      <Divider />
      <Heading mt={5} size="sm">
        Cantidad: {cantidad}
      </Heading>
    </>
  );

  const PendingHeader = () => (
    <Heading size="lg">Aceptando donación ...</Heading>
  );

  const PendingBody = () => (
    <Flex height="250px" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Flex>
  );

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

const DonationItem = (item: Donation) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    cod_estado,
    donante: { nombre, apellido },
  } = item;
  const boxColor =
    DonationStates.Pendiente === cod_estado || DonationStates.Cancelada
      ? "gray.100"
      : "teal.100";
  const icon =
    DonationStates.Aceptada === cod_estado ? (
      <CheckIcon boxSize={"1.5rem"} mr={1} />
    ) : (
      <TimeIcon boxSize={"1.5rem"} mr={1} />
    );

  const StateBlock = () => (
    <>
      <b>Estado: </b>
      {DonationStates[cod_estado]}
      <br />
    </>
  );

  return (
    <Flex
      alignItems="center"
      minHeight={"50px"}
      bg={boxColor}
      padding={2}
      borderRadius={"0.5rem"}
    >
      {icon}
      <ListItem key={item.id} ml={2} borderLeft={"1px solid gray"} pl={2}>
        <b>Donante:</b> {nombre}, {apellido}
        <br />
        <StateBlock />
        <Button onClick={onOpen} colorScheme={"pink"} mt={"10px"} size={"sm"}>
          Ver detalle
        </Button>
      </ListItem>
      {/* <DonationModal item={item.bienes[0]} onClose={onClose} isOpen={isOpen} /> */}
    </Flex>
  );
};

export const DonationPendings = () => {
  const { fetchPendingDonations, donations, loading, error } =
    usePendingDonations();

  useEffect(() => {
    fetchPendingDonations();
  }, []);

  return (
    <Flex flexWrap="wrap">
      <Heading>Ultimas donaciones</Heading>
      <Box width={"100%"} mt="10">
        {loading && <LoadingSpinner />}
        {error && (
          <Flex>
            <p>
              Oops! Algo no ha salido como se esperaba, no se han podido cargar
              las donaciones.
            </p>
          </Flex>
        )}
        {!error && !loading && (
          <List spacing={4}>
            {donations.length > 0 &&
              donations.map((item) => <DonationItem {...item} />)}
          </List>
        )}
      </Box>
    </Flex>
  );
};
