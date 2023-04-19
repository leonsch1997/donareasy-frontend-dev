import { FC } from "react";
import {
  TimeIcon,
  CheckCircleIcon,
  CalendarIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Flex,
  ListItem,
  useDisclosure,
  List,
  ChakraProps,
  useTheme,
} from "@chakra-ui/react";
import { Donation, DonationStates } from "../types";
import { DonationModal } from "./DonationModal";

export const DonationsList: FC<{ donations: Donation[] }> = ({ donations }) => {
  const theme = useTheme();

  console.log(theme.colors)
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

  const getBoxColor = () => {
    switch (cod_estado) {
      case DonationStates.Aceptada:
        return "teal.50";
      case DonationStates.Cancelada:
        return "pink.50";
      case DonationStates.Agendada:
        return "gray.50";
      case DonationStates.Pendiente:
        return "yellow.50";
      case DonationStates.Entregada:
        return "green.50";
    }
  };

  const renderIcon = () => {
    const iconStyle = { boxSize: cod_estado === DonationStates.Cancelada ? "0.8rem" : "1.0rem", mr: 1 } as ChakraProps;
    switch (cod_estado) {
      case DonationStates.Aceptada:
        return <CheckIcon {...iconStyle} />;
      case DonationStates.Cancelada:
        return <CloseIcon {...iconStyle} />;
      case DonationStates.Agendada:
        return <CalendarIcon {...iconStyle} />;
      case DonationStates.Pendiente:
        return <TimeIcon {...iconStyle} />;
      case DonationStates.Entregada:
        return <CheckCircleIcon {...iconStyle} />;
    }
  };

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
      bg={getBoxColor()}
      padding={2}
      borderRadius={"0.5rem"}
    >
      {renderIcon()}
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
