import {
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { usePendingDonations } from "../../../hooks";
import { LoadingSpinner } from "../../Common";
import { DonationsList } from "./DonationsList";

export const DonationPendings = () => {
  const { fetchPendingDonations, donations, loading, error } =
    usePendingDonations();

  useEffect(() => {
    fetchPendingDonations();
  }, [fetchPendingDonations]);

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
        {!error && !loading && <DonationsList donations={donations} />}
      </Box>
    </Flex>
  );
};
