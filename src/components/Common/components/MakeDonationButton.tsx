import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";

export const MakeDonationButton = () => {
  const navigate = useNavigate();

  const goToCreateDonation = () => navigate(routes.donar);
  return (
    <Button onClick={goToCreateDonation} colorScheme="linkedin" mr={2}>
      Realizar Donación
    </Button>
  );
};
