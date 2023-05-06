import { FC } from "react";
import {
  Button,
  Flex,
  ListItem,
  useDisclosure,
  List,
  Text,
} from "@chakra-ui/react";
import { getBoxColor } from "../../../utils";
import { StateBasedIcon } from ".";
import { DonationModal } from "./DonationModal";
import { Donation, DonationStates, MoneyDonationStates } from "../types";

export const DonationsList: FC<{ donations: Donation[] }> = ({ donations }) => {
  return (
    <List width="100%" spacing={4}>
      {donations.length > 0 ? (
        donations.map((item, idx) => <DonationItem {...item} key={idx} />)
      ) : (
        <>
          <Text fontWeight="bold">Sin donaciones en el último período</Text>
          <Text>
            Parece que no has realizado donaciones últimamente. Puedes realizar
            una nueva presionando en el botón "Realizar Donación"
          </Text>
        </>
      )}
    </List>
  );
};

export const DonationItem = (item: Donation) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    cod_estado,
    donante: { nombre, apellido },
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
      minHeight={50}
      bg={getBoxColor(cod_estado, isMoneyDonation)}
      padding={4}
      borderRadius={"0.5rem"}
    >
      <StateBasedIcon
        stateCode={cod_estado}
        isMoneyDonation={isMoneyDonation}
      />
      <ListItem key={item.id} pl={4}>
        <b>Donante:</b> {nombre} {apellido}
        <br />
        <StateBlock />
        <Button onClick={onOpen} colorScheme={"pink"} mt={2} size={"sm"}>
          Ver detalle
        </Button>
      </ListItem>
      <DonationModal item={item} onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
};
