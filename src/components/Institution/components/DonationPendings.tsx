import { Flex, Box, Button, Heading, List, ListItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Divider, Alert, ModalFooter, useDisclosure, Spinner } from "@chakra-ui/react";
import { CheckIcon, TimeIcon } from "@chakra-ui/icons";
import { getDonations } from '../utils';
import { Donation } from '../types';
import { useState } from "react";
import axios from "axios";
import { endpoints } from "../../../api";

const DonationModal = ({ item, isOpen, onClose }: {
  item: Donation;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { nombre, fecha_aceptacion, descripcion, cantidad } = item;
  const [acceptPending, setAcceptPending] = useState(false);

  const acceptDonation = () => {
    console.log('Awaiting ...');
    setAcceptPending(true);
    setTimeout(() => {
      setAcceptPending(false);
      console.log('Accepted!');
    }, 2000)
  };

  const rejectDonation = () => {
    console.log('Awaiting ...');
    setAcceptPending(true);
    setTimeout(() => {
      setAcceptPending(false);
      console.log('Rejected!');
    }, 2000)
  };

  const Footer = () => (
    <Flex justifyContent='center' width='100%' flexWrap='wrap'>
      {!fecha_aceptacion && (
          <>
            <Box mb={2}>
              <Alert width='100%' status='warning'>
                Para poder enviar esta donación, debe ser aceptada
              </Alert>
            </Box>
            <Flex width="100%" justifyContent='center' mb={2}>
              <Button onClick={acceptDonation} colorScheme='teal' mr={2}>Aceptar</Button>
              <Button onClick={rejectDonation} colorScheme='red' mr={2}>Rechazar</Button>
            </Flex>
          </>
      )}
  </Flex>
  );

  const Body = () => (
    <>
      <Heading size="lg">{nombre}</Heading>
      <Divider mt={2}/>
      <Flex mt={5} mb={5}>{descripcion}</Flex>
      <Divider />
      <Heading mt={5} size="sm">Cantidad: {cantidad}</Heading>
    </>
  );

  const PendingHeader = () => <Heading size="lg">Aceptando donación ...</Heading>;

  const PendingBody = () => (
    <Flex height="250px" alignItems="center" justifyContent="center">
      <Spinner size='xl' />
    </Flex>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{acceptPending ? <PendingHeader /> : null}</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign='center'>
          {acceptPending ? <PendingBody /> : <Body />}
        </ModalBody>

        <ModalFooter mt={0}>
          {acceptPending ? null : <Footer />}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

const DonationItem = (item: Donation) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const boxColor =  !item.fecha_entrega_real ? 'gray.100' : 'teal.100';
  const icon = item.fecha_entrega_real ? <CheckIcon boxSize={'1.5rem'} mr={1}/> : <TimeIcon boxSize={'1.5rem'} mr={1} />;
  const accepted = item.fecha_aceptacion;
  const shipped = item.fecha_entrega_real;
  
  const state = !accepted ? 'Pendiente aceptación' : shipped ? 'Entregado' : 'Pendiente entrega';
  const StateBlock = () => <><b>Estado: </b>{state}<br /></>;

  return (
    <Flex alignItems="center" minHeight={'50px'} bg={boxColor} padding={2} borderRadius={'0.5rem'}>
      {icon}
      <ListItem ml={2} borderLeft={'1px solid gray'} pl={2}>
        <b>Nombre:</b> {item.nombre} <br />
        <StateBlock />
        <Button onClick={onOpen} colorScheme={'pink'} mt={'10px'} size={'sm'}>Ver detalle</Button>
      </ListItem>
      <DonationModal item={item} onClose={onClose} isOpen={isOpen} />    
    </Flex>
  )
}

export const DonationPendings = () => {
  const [data, setDonations] = useState([]);
  const donations = getDonations();

  const response = async () => {
    try {
      console.log('Fetching')
      const response = await axios.get(`${endpoints['donacionesPendientes']}1/`, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': 'W5iUDN1shqSx4QoevShLHBiuBinq9dw6LQWLSErJbfb8rxSsI9u99YvxCZgekWWc',
        }
      }
      );
  
      setDonations(response.data.results);
    } catch {
      console.log('Error')
    }
  };

  return (
    <Flex flexWrap="wrap">
      <button onClick={response}>Buscar</button>
      <Heading >Ultimas donaciones</Heading>
      <Box width={'100%'} mt="10">
        <List spacing={4}>
          {donations.map((donation, idx) => <DonationItem key={idx} {...donation} />)}
        </List>      
      </Box>
    </Flex>
  )
}