import { FC } from 'react';
import { CheckIcon, TimeIcon } from "@chakra-ui/icons";
import { Button, Flex, ListItem, useDisclosure, List } from "@chakra-ui/react";
import { Donation, DonationStates } from "../types";
import { DonationModal } from "./DonationModal";

export const DonationsList: FC<{ donations: Donation[] }> = ({ donations }) => {
  return (
    <List spacing={4}>
      {donations.length > 0 &&
        donations.map((item, idx) => <DonationItem key={idx} {...item} />)}
    </List>
  );
};

export const DonationItem = (item: Donation) => {
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
      <CheckIcon boxSize={"1.0rem"} mr={1} />
    ) : (
      <TimeIcon boxSize={"1.0rem"} mr={1} />
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
        <b>Donante:</b> {nombre} {apellido}
        <br />
        <StateBlock />
        <Button onClick={onOpen} colorScheme={"pink"} mt={"10px"} size={"sm"}>
          Ver detalle
        </Button>
      </ListItem>
      <DonationModal item={item} onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
};
