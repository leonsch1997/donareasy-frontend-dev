import { FC } from "react";
import {
  TimeIcon,
  CheckCircleIcon,
  CalendarIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { ChakraProps } from "@chakra-ui/react";
import { DonationStates, MoneyDonationStates } from "../types";

export const StateBasedIcon: FC<{
  stateCode: DonationStates | MoneyDonationStates;
  isMoneyDonation: boolean;
}> = ({ stateCode, isMoneyDonation }) => {
  const iconStyle = {
    boxSize: stateCode === DonationStates.Cancelada ? "0.5rem" : "0.8rem",
    mr: 1,
  } as ChakraProps;
  if (isMoneyDonation) {
    switch (stateCode) {
      case MoneyDonationStates.Pendiente:
        return <TimeIcon {...iconStyle} />;
      case MoneyDonationStates.Aceptada:
        return <CheckIcon {...iconStyle} />;
      case MoneyDonationStates.Cancelada:
        return <CloseIcon {...iconStyle} />;
    }
  } else {
    switch (stateCode) {
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
  }

  return null;
};
