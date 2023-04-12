import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
} from '@chakra-ui/react';

import { useState } from 'react';
import { donationStates } from './constants';
import { DonationItemProps, DonationsListProps } from './types';


const ItemContent = ({ item }: DonationItemProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleModal = () => setShowDetails(!showDetails);

  const ItemContent = () => (
    <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>Detalle donacion</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign='center'>
        <TableContainer>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Descripcion</Th>
                <Th isNumeric>Cantidad</Th>
              </Tr>
            </Thead>
            <Tbody>
              {item.bienes.map(({ nombre, descripcion, cantidad }, index) => (
                <Tr key={index}>
                  <Td>{nombre}</Td>
                  <Td maxW={100} textOverflow='ellipsis' overflow='hidden'>{descripcion}</Td>
                  <Td isNumeric>{cantidad}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        </ModalBody>

        <ModalFooter pr={0}>
          <Button colorScheme='pink' mr={3} onClick={handleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return(
    <>
      <AccordionPanel pb={4}>
        <Flex flexDirection='column'>
          <Flex flexDirection='row' alignItems='center'>
          {`Estado: ${donationStates[item.cod_estado as keyof typeof donationStates]}`}
          </Flex>
          <Flex flexDirection='row' alignItems='center'>
          {`Localidad: ${item.donante.localidad}`}
          </Flex>
          <Flex flexDirection='row' alignItems='center'>
          {`Teléfono: ${item.donante.telefono}`}
          </Flex>
          <Flex flexDirection='row' alignItems='center'>
          {`Total bienes: ${item.bienes.length}`}
          </Flex>
        </Flex>
        <Flex mt={6} flexDirection='column'>
          <Button colorScheme='pink' onClick={handleModal}>Ver detalle</Button>
        </Flex>
      </AccordionPanel>

      {showDetails && (
        <ItemContent />
      )}
    </>
  )
}

const DonationItem = ({ item }: DonationItemProps) => {
  const { donante } = item;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex='1' textAlign='left'>
            <b>Donación de:</b> {donante.nombre} {donante.apellido} 
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <ItemContent item={item}/>
    </AccordionItem>
  )
}

export const DonationsList = ({ list }: DonationsListProps) => {
  return(
    <Accordion minWidth={700} allowToggle>
      {list.map((donacion, index) => <DonationItem key={index} item={donacion} />)}
    </Accordion>
  )
};
