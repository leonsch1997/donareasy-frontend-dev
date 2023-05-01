import { FC } from "react";

import {
  Button,
  Flex,
  ListItem,
  useDisclosure,
  List,
} from "@chakra-ui/react";
import { getBoxColor } from '../utils';
import { Donation, DonationStates, MoneyDonationStates } from "../types";
import { DonationModal } from "./DonationModal";
import { StateBasedIcon } from "./StateBasedIcon";

export const DonationsList: FC<{ donations: Donation[] }> = ({ donations }) => {
  return (
    <List spacing={4}>
      {donations.length > 0 &&
        donations.map((item, idx) => <DonationItem {...item} key={idx} />)}
    </List>
  );
};

export const DonationItem = (item: Donation) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    cod_estado,
    institucion: { nombre },
  } = item;
  const isMoneyDonation = item.hasOwnProperty("monto");

  const StateBlock = () => (
    <>
      <b>Estado: </b>
      {isMoneyDonation
        ? MoneyDonationStates[cod_estado]
        : DonationStates[cod_estado]}
      <br />
    </>
  );

  return (
    <Flex
      alignItems="center"
      minHeight={"50px"}
      bg={getBoxColor(cod_estado, isMoneyDonation)}
      padding={2}
      borderRadius={"0.5rem"}
    >
      <StateBasedIcon stateCode={cod_estado} isMoneyDonation={isMoneyDonation} />
      <ListItem key={item.id} ml={2} borderLeft={"1px solid gray"} pl={2}>
        <b>Institución:</b> {nombre}
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
