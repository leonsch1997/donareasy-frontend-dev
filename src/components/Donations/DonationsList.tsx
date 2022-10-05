import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Flex, Button } from '@chakra-ui/react';
import { donationStates } from './constants';
import { DonationItemProps, DonationsListProps } from './types';


const ItemContent = ({ item }: DonationItemProps) => {
  console.log(item)
  return(
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
        <Button>Ver detalle</Button>
      </Flex>
    </AccordionPanel>
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
    <Accordion allowToggle>
      {list.map((donacion, index) => <DonationItem key={index} item={donacion} />)}
    </Accordion>
  )
};
